/**
 * Icon set.
 * Brand Guidelines §6: outlined, rounded terminals, 1.5 to 2px stroke at a
 * 24x24 reference, single color, no mixing of outlined and filled in one view.
 * Drawn to match rather than pulled from a library, so stroke weight and
 * density stay consistent across every icon we use.
 */

export interface IconProps {
  size?: number
  className?: string
  /** Icons are decorative by default. Pass a title only when the icon is the
   *  sole label for a control, in which case it becomes an accessible name. */
  title?: string
}

function Svg({
  size = 24,
  className,
  title,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}

export const ShieldIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3l7 3v5.5c0 4.2-2.9 7.9-7 9.5-4.1-1.6-7-5.3-7-9.5V6l7-3Z" />
    <path d="M9.2 12.1l2 2 3.6-3.9" />
  </Svg>
)

export const ToothIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4.6c1.7-1.3 3.4-1.7 4.8-1.2 1.8.7 2.7 2.7 2.7 5.2 0 2-.5 3.4-1.1 5.6-.5 1.8-.7 3-.9 4.5-.2 1.4-.6 2.3-1.4 2.3-.9 0-1.2-.9-1.5-2.7l-.5-3.1c-.2-1.1-.6-1.7-1.4-1.7h-.3c-.8 0-1.2.6-1.4 1.7l-.5 3.1c-.3 1.8-.6 2.7-1.5 2.7-.8 0-1.2-.9-1.4-2.3-.2-1.5-.4-2.7-.9-4.5-.6-2.2-1.1-3.6-1.1-5.6 0-2.5.9-4.5 2.7-5.2 1.4-.5 3.1-.1 4.8 1.2Z" />
  </Svg>
)

export const SparkleIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" />
    <path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z" />
  </Svg>
)

export const ImplantIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 3.2h6" />
    <path d="M9.4 6.2h5.2" />
    <path d="M10 9.2h4" />
    <path d="M12 3.2v6" />
    <path d="M12 9.2c2.4 0 4 1.6 4 4 0 2.6-1 4.6-1.5 6.2-.3 1-.6 1.4-1.1 1.4-.6 0-.8-.5-.9-1.6l-.3-2.6c-.1-.6-.2-.9-.2-.9s-.1.3-.2.9l-.3 2.6c-.1 1.1-.3 1.6-.9 1.6-.5 0-.8-.4-1.1-1.4C9 17.8 8 15.8 8 13.2c0-2.4 1.6-4 4-4Z" />
  </Svg>
)

export const AlertIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10.6 3.9 2.6 17.5a1.6 1.6 0 0 0 1.4 2.4h16a1.6 1.6 0 0 0 1.4-2.4L13.4 3.9a1.6 1.6 0 0 0-2.8 0Z" />
    <path d="M12 9v4" />
    <path d="M12 16.6h.01" />
  </Svg>
)

export const JawIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 6.5c0-1.4 1.1-2.5 2.5-2.5S9 5.1 9 6.5c0 3.5 1.5 5 3.9 5.6 2.5.6 4.1 2 4.1 4.4 0 2-1.5 3.5-3.5 3.5" />
    <path d="M17.5 4c1.4 0 2.5 1.1 2.5 2.5S18.9 9 17.5 9" />
    <circle cx="6.6" cy="16.4" r="2.4" />
  </Svg>
)

export const MoonIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />
  </Svg>
)

export const StethoscopeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 3v5a4 4 0 0 0 8 0V3" />
    <path d="M5 3H3.5M13 3h1.5" />
    <path d="M9 12v2.5a4.5 4.5 0 0 0 9 0V13" />
    <circle cx="18" cy="11" r="2" />
  </Svg>
)

export const MailIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2.8" y="4.8" width="18.4" height="14.4" rx="2" />
    <path d="m3.4 6.6 8.6 6 8.6-6" />
  </Svg>
)

export const PinIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 10.4c0 5.4-8 11.2-8 11.2s-8-5.8-8-11.2a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10.2" r="2.9" />
  </Svg>
)

export const BellIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M18.2 15.4V10a6.2 6.2 0 1 0-12.4 0v5.4L4 17.6h16l-1.8-2.2Z" />
    <path d="M10.2 20.6a2 2 0 0 0 3.6 0" />
  </Svg>
)

export const PhoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M21 16.9v2.6a1.7 1.7 0 0 1-1.9 1.7 17 17 0 0 1-14.3-14.3A1.7 1.7 0 0 1 6.5 5h2.6a1.7 1.7 0 0 1 1.7 1.5c.1.9.3 1.8.7 2.6a1.7 1.7 0 0 1-.4 1.8l-1.1 1.1a14 14 0 0 0 5.4 5.4l1.1-1.1a1.7 1.7 0 0 1 1.8-.4c.8.4 1.7.6 2.6.7a1.7 1.7 0 0 1 1.5 1.7Z" />
  </Svg>
)

export const CalendarIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.2" y="5" width="17.6" height="16" rx="2" />
    <path d="M3.2 10h17.6M8.4 3v4M15.6 3v4" />
  </Svg>
)

export const ClockIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 6.8V12l3.4 2" />
  </Svg>
)

export const CheckIcon = ({ size = 18, ...p }: IconProps) => (
  <Svg size={size} {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </Svg>
)

export const ChevronIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m7 10 5 5 5-5" />
  </Svg>
)

export const ArrowIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 12h14M13 6.5l5.5 5.5L13 17.5" />
  </Svg>
)

export const MenuIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
)

export const CloseIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
)

export const BuildingIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 21V6.5L12 3l8 3.5V21" />
    <path d="M4 21h16" />
    <path d="M9.5 21v-4.5h5V21" />
    <path d="M8.5 9.5h1.5M14 9.5h1.5M8.5 13h1.5M14 13h1.5" />
  </Svg>
)

export const HeartIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20.4 6.9a4.7 4.7 0 0 0-6.7 0L12 8.6l-1.7-1.7a4.7 4.7 0 1 0-6.7 6.7l1.7 1.7L12 22l6.7-6.7 1.7-1.7a4.7 4.7 0 0 0 0-6.7Z" />
  </Svg>
)

export const UsersIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M16.5 20v-1.8a3.5 3.5 0 0 0-3.5-3.5H6.5A3.5 3.5 0 0 0 3 18.2V20" />
    <circle cx="9.75" cy="7.5" r="3.5" />
    <path d="M21 20v-1.8a3.5 3.5 0 0 0-2.6-3.4M15.5 4.2a3.5 3.5 0 0 1 0 6.6" />
  </Svg>
)

export const DocumentIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <path d="M14 3v5h5M9 13h6M9 17h6" />
  </Svg>
)

export const CompassIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.2 8.8-1.9 4.5-4.5 1.9 1.9-4.5 4.5-1.9Z" />
  </Svg>
)

/** Maps a service category's icon name to its component. */
export const serviceIcons = {
  shield: ShieldIcon,
  tooth: ToothIcon,
  sparkle: SparkleIcon,
  'anchor-implant': ImplantIcon,
  alert: AlertIcon,
  jaw: JawIcon,
  moon: MoonIcon,
  stethoscope: StethoscopeIcon,
} as const

export const actionIcons = {
  bell: BellIcon,
  mail: MailIcon,
  pin: PinIcon,
  phone: PhoneIcon,
  calendar: CalendarIcon,
} as const
