'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { enableClickToCall } from '@/config/practice'

/**
 * ANALYTICS
 * =========
 * Google Tag Manager, loaded only when a container ID is configured.
 *
 * Consent: Google Consent Mode v2 is initialised in *denied* state before GTM
 * loads, so no advertising or analytics storage is written until the visitor
 * grants it. `docs/ANALYTICS-PLAN.md` documents the event schema and the
 * consent update call the CMP must make.
 *
 * Nothing here fires `click_to_call`. That event is registered only when
 * `enableClickToCall` is true, which requires a real phone number.
 */

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

/** Push a named event with optional parameters. Safe before GTM loads. */
export function trackEvent(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

export function Analytics() {
  /**
   * Delegated click tracking.
   * Any element carrying `data-event="name"` reports that event. One listener
   * for the whole document beats a handler per button, and it keeps analytics
   * concerns out of the presentational components.
   */
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-event]')
      if (!target) return

      const name = target.dataset.event
      if (!name) return

      // Guard: never emit a call event while no phone number is configured.
      if (name === 'click_to_call' && !enableClickToCall) return

      trackEvent(name, {
        link_text: target.textContent?.trim().slice(0, 100),
        link_url: target.getAttribute('href') ?? undefined,
      })
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  if (!GTM_ID && !GA4_ID) return null

  return (
    <>
      {/* Consent defaults. Must execute before any tag that reads consent. */}
      <Script id="consent-default" strategy="beforeInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  analytics_storage:'denied',
  functionality_storage:'granted',
  security_storage:'granted',
  wait_for_update: 500
});
gtag('set','ads_data_redaction', true);
gtag('set','url_passthrough', true);
        `}
      </Script>

      {GTM_ID ? (
        <Script id="gtm" strategy="afterInteractive">
          {`
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      ) : null}
    </>
  )
}
