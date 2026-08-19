/**
 * In-memory fixed-window rate limiter.
 *
 * SCOPE AND LIMITS: this protects a single server instance only. It is
 * adequate for a low-volume brochure site on a single node, and it is NOT
 * adequate once the site runs on multiple instances or on a serverless
 * platform that spins up separate isolates per request.
 *
 * Before launch, confirm the hosting model. If it is serverless or
 * multi-instance, swap `hit()` for a shared store (Upstash Redis, Vercel KV,
 * or the platform's own rate limiting). The call signature is designed so the
 * swap touches this file only. See docs/LAUNCH-CHECKLIST.md.
 */

interface Bucket {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

/** Evict expired buckets so the map cannot grow without bound. */
function sweep(now: number): void {
  if (buckets.size < 500) return
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key)
  }
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  retryAfterSeconds: number
}

export function hit(key: string, limit = 5, windowMs = 10 * 60_000): RateLimitResult {
  const now = Date.now()
  sweep(now)

  const existing = buckets.get(key)

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 }
  }

  existing.count += 1
  const allowed = existing.count <= limit

  return {
    allowed,
    remaining: Math.max(0, limit - existing.count),
    retryAfterSeconds: allowed ? 0 : Math.ceil((existing.resetAt - now) / 1000),
  }
}

/**
 * Best-effort client IP.
 * Trusts x-forwarded-for only because the app is expected to sit behind a
 * managed proxy that overwrites it. Behind a bare origin server this header is
 * spoofable and the limiter should key on something else.
 */
export function clientKey(headers: Headers, scope: string): string {
  const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const ip = forwarded || headers.get('x-real-ip') || 'unknown'
  return `${scope}:${ip}`
}
