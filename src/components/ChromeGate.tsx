'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

/**
 * Paths that render without the site chrome (announcement bar, header,
 * footer, mobile action bar). Paid-traffic landing pages live here: a visitor
 * arriving from an ad should see one message and one form, not a navigation
 * menu full of exits. Each landing page supplies its own minimal header and
 * footer.
 */
const LANDING_PREFIXES = ['/visit']

export function isLandingPath(pathname: string | null): boolean {
  if (!pathname) return false
  return LANDING_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

/**
 * Renders its children everywhere except on landing paths. The children are
 * server components passed through from the root layout, so the gate itself
 * is the only client boundary this adds.
 */
export function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  if (isLandingPath(pathname)) return null
  return <>{children}</>
}
