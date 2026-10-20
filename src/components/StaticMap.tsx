'use client'

import { useState, type SyntheticEvent } from 'react'
import { PinIcon } from './Icons'
import { address, addressLines, practiceName } from '@/config/practice'

/**
 * Location map with an explicit opt-in.
 *
 * Nothing from Google is requested until the visitor opens the panel. The
 * iframe element is not rendered at all while closed, because a lazy iframe
 * inside a closed <details> is still fetched by Chrome, which both contradicts
 * the privacy note shown on the preview and pulls the Maps JavaScript into
 * every page that shows the map, including the home page.
 *
 * Native <details>/<summary> keeps it keyboard accessible without any custom
 * key handling; React state only decides whether the iframe exists.
 */
export function StaticMap() {
  const [open, setOpen] = useState(false)

  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `${address.line1}, ${address.city}, ${address.state} ${address.postalCode}`,
  )}&output=embed`

  function onToggle(e: SyntheticEvent<HTMLDetailsElement>) {
    setOpen(e.currentTarget.open)
  }

  return (
    <div className="map">
      <details className="map__details" onToggle={onToggle}>
        {/* The same summary serves both states: the full preview card while
            closed, a small "Hide map" control once the map is showing. */}
        <summary className={open ? 'map__toggle' : 'map__preview'}>
          {open ? (
            <span className="btn btn--outline">
              Hide map<span className="sr-only"> and return to the address card</span>
            </span>
          ) : null}
          <span className="map__previewInner" hidden={open}>
            <span className="map__pin" aria-hidden="true">
              <PinIcon size={26} />
            </span>
            <span className="map__addr">
              {addressLines.map((l) => (
                <span key={l} style={{ display: 'block' }}>
                  {l}
                </span>
              ))}
            </span>
            <span className="btn btn--outline" aria-hidden="true">
              Load interactive map
            </span>
            <span className="map__note">
              Loading the map connects to Google Maps and may set cookies.
            </span>
            <span className="sr-only">
              Load an interactive Google map showing {address.line1}, {address.city}. This connects
              to Google and may set cookies.
            </span>
          </span>
        </summary>
        {open ? (
          <iframe
            src={embedSrc}
            title={`Map showing ${practiceName} at ${address.line1}, ${address.city}, ${address.state}`}
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : null}
      </details>
    </div>
  )
}
