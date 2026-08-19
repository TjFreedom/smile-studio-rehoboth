'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { Logo } from './Logo'
import { ChevronIcon, CloseIcon, MailIcon, MenuIcon } from './Icons'
import { primaryNav, navCta, type NavItem } from '@/content/navigation'
import { affiliationLabel, mailtoUrl, showPhoneNumber, phoneNumber } from '@/config/practice'

/**
 * Site header.
 *
 * Phone treatment: while `showPhoneNumber` is false there is no phone number,
 * no phone icon, and no reserved empty slot where one would go. The email
 * action occupies that position instead, so the header never looks like it is
 * missing something.
 */
export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const mobileId = useId()

  // Close everything on navigation.
  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  // Escape closes the open menu and returns focus to the trigger.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      if (mobileOpen) {
        setMobileOpen(false)
        toggleRef.current?.focus()
      }
      setOpenMenu(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  // Click outside closes desktop dropdowns.
  useEffect(() => {
    if (!openMenu) return
    function onClick(e: MouseEvent) {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [openMenu])

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        {/* WCAG 2.5.3 Label in Name: the accessible name must contain the
            visible text. An aria-label of "... home" overrode the visible
            affiliation line and failed that check, so the name is built from
            the content instead: the logo carries real alt text and the
            affiliation line follows it. */}
        <Link href="/" className="site-header__brand">
          <Logo variant="horizontal" width={228} priority />
          <span className="site-header__affiliation">{affiliationLabel}</span>
        </Link>

        <nav ref={navRef} className="site-header__nav" aria-label="Main">
          <ul className="nav-list">
            {primaryNav
              .filter((i) => i.href !== '/')
              .map((item) => (
                <NavNode
                  key={item.href}
                  item={item}
                  active={isActive(item.href)}
                  open={openMenu === item.href}
                  onToggle={() => setOpenMenu(openMenu === item.href ? null : item.href)}
                  onClose={() => setOpenMenu(null)}
                />
              ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          {/* Phone slot. Renders only when a real number exists. */}
          {showPhoneNumber && phoneNumber ? (
            <a href={`tel:${phoneNumber}`} className="site-header__phone" data-event="click_to_call">
              {phoneNumber}
            </a>
          ) : null}

          <a href={mailtoUrl} className="site-header__email" data-event="email_click">
            <MailIcon size={18} />
            <span>Email Our Team</span>
          </a>

          <Link href={navCta.href} className="btn site-header__cta">
            {navCta.label}
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className="site-header__burger"
            aria-expanded={mobileOpen}
            aria-controls={mobileId}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <CloseIcon size={26} /> : <MenuIcon size={26} />}
            <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div id={mobileId} className="mobile-nav" data-open={mobileOpen} hidden={!mobileOpen}>
        <nav aria-label="Mobile" className="container">
          <ul className="mobile-nav__list">
            {primaryNav.map((item) => (
              <li key={item.href}>
                {item.children?.length ? (
                  <MobileGroup item={item} isActive={isActive} />
                ) : (
                  <Link
                    href={item.href}
                    className="mobile-nav__link"
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mobile-nav__actions">
            <Link href={navCta.href} className="btn btn--full">
              {navCta.label}
            </Link>
            <a href={mailtoUrl} className="btn btn--outline btn--full" data-event="email_click">
              <MailIcon size={18} />
              Email Our Team
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ */

function NavNode({
  item,
  active,
  open,
  onToggle,
  onClose,
}: {
  item: NavItem
  active: boolean
  open: boolean
  onToggle: () => void
  onClose: () => void
}) {
  const id = useId()

  if (!item.children?.length) {
    return (
      <li>
        <Link href={item.href} className="nav-link" aria-current={active ? 'page' : undefined}>
          {item.shortLabel ?? item.label}
        </Link>
      </li>
    )
  }

  return (
    <li className="nav-item" onMouseLeave={onClose}>
      <button
        type="button"
        className="nav-link nav-link--toggle"
        aria-expanded={open}
        aria-controls={id}
        data-active={active || undefined}
        onClick={onToggle}
      >
        {item.shortLabel ?? item.label}
        <ChevronIcon size={15} />
      </button>
      <ul id={id} className="nav-dropdown" hidden={!open}>
        {item.children.map((child) => (
          <li key={child.href}>
            <Link href={child.href}>{child.label}</Link>
          </li>
        ))}
      </ul>
    </li>
  )
}

function MobileGroup({
  item,
  isActive,
}: {
  item: NavItem
  isActive: (href: string) => boolean
}) {
  const [open, setOpen] = useState(() => isActive(item.href))
  const id = useId()

  return (
    <>
      <button
        type="button"
        className="mobile-nav__link mobile-nav__link--toggle"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        {item.label}
        <ChevronIcon size={18} />
      </button>
      <ul id={id} className="mobile-nav__sub" hidden={!open}>
        {item.children?.map((child) => (
          <li key={child.href}>
            <Link href={child.href} aria-current={isActive(child.href) ? 'page' : undefined}>
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
