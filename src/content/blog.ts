/**
 * BLOG / EDUCATIONAL RESOURCES
 * ============================
 * Only pre-opening topics are published. Treatment-specific clinical content
 * stays unpublished until clinical leadership confirms the practice can
 * appropriately evaluate or provide the service, and until a named provider
 * has reviewed it. See docs/CONTENT-CALENDAR.md for the full 12-month plan.
 *
 * `reviewedBy` is deliberately null on every post below. Brand Guidelines §10
 * and the project brief both prohibit attributing content to a provider who
 * has not reviewed it, and no provider roster has been confirmed.
 */

export interface BlogPost {
  slug: string
  title: string
  /** Meta description, 150 to 160 characters. */
  description: string
  date: string
  updated?: string
  category: 'Practice News' | 'Patient Education' | 'Our New Office'
  readingTime: string
  excerpt: string
  /** Paragraphs and subheadings. 'h2' renders a heading, 'p' a paragraph. */
  body: Array<{ type: 'h2' | 'p' | 'ul'; text?: string; items?: string[] }>
  /** [TO CONFIRM] Provider reviewer. Null until a provider actually reviews it. */
  reviewedBy: null | { name: string; credentials: string; reviewedOn: string; profilePath: string }
  related: string[]
}

export const posts: BlogPost[] = [
  {
    slug: 'a-new-dental-office-is-coming-to-rehoboth-beach',
    title: 'A New Dental Office Is Coming to Rehoboth Beach',
    description:
      'Smile Studio of Rehoboth is under construction at 19411 Plantations Road, with an anticipated opening in late November or early December 2026.',
    date: '2026-08-19',
    category: 'Practice News',
    readingTime: '3 min read',
    excerpt:
      'Construction is underway on a new dental practice at 19411 Plantations Road. Here is what we can tell you so far, and what we are not going to guess at.',
    body: [
      {
        type: 'p',
        text: 'Smile Studio of Rehoboth is being built at 19411 Plantations Road, in Plantations Professional Park. We anticipate opening in late November or early December 2026.',
      },
      {
        type: 'p',
        text: 'That is an anticipated window rather than a date, and the distinction is deliberate. Construction schedules move. Publishing a specific day this far out would mean either getting lucky or walking it back later, and neither is a good way to start a relationship with a community.',
      },
      { type: 'h2', text: 'Why Plantations Road' },
      {
        type: 'p',
        text: 'Anyone who has spent a July afternoon on Rehoboth Avenue understands the appeal of not being on Rehoboth Avenue. The Plantations Road location sits just off the Coastal Highway and Route 1 corridor and is reachable from the Route 24 and Route 9 corridors, which puts it within a practical drive of Lewes, Dewey Beach, Harbeson, Milton, Long Neck, and Millsboro.',
      },
      {
        type: 'p',
        text: 'For a practice that wants to serve year-round residents first, that access matters more than a storefront address. A dental appointment you can actually get to in season is worth more than one you keep rescheduling.',
      },
      { type: 'h2', text: 'What we are still working out' },
      {
        type: 'p',
        text: 'Quite a lot, and we would rather list it than imply otherwise. The provider team has not been announced. The final service list has not been confirmed by clinical leadership. Insurance participation is not settled. There is no public phone number yet, which is why every contact route on this site is by email for now.',
      },
      {
        type: 'p',
        text: 'Each of those will be published here as it is confirmed, and none of them will be published before.',
      },
      { type: 'h2', text: 'How to follow along' },
      {
        type: 'p',
        text: 'The opening list is the fastest route to real information. Subscribers receive the confirmed opening date, provider introductions, and early scheduling details before appointments open to the public. It is a short form and you can leave at any time.',
      },
    ],
    reviewedBy: null,
    related: ['why-we-chose-the-plantations-road-location', 'what-to-expect-from-the-new-office'],
  },

  {
    slug: 'why-we-chose-the-plantations-road-location',
    title: 'Why We Chose the Plantations Road Location',
    description:
      'How access, parking, and year-round convenience shaped the decision to build Smile Studio of Rehoboth in Plantations Professional Park.',
    date: '2026-08-19',
    category: 'Our New Office',
    readingTime: '4 min read',
    excerpt:
      'Choosing where to put a dental practice in a resort town is mostly a question about traffic, and about who you are actually building for.',
    body: [
      {
        type: 'p',
        text: 'A dental practice in a beach town has a decision to make early, and it shows up in the address. You can build for visitors, in which case you want to be where the visitors are. Or you can build for the people who live here, in which case you want to be where they can reach you in August without budgeting an extra thirty minutes.',
      },
      { type: 'h2', text: 'Building for the year-round patient' },
      {
        type: 'p',
        text: 'Sussex County has a large and growing year-round population, including a substantial number of active retirees who moved here on purpose. Those patients are the foundation of a general dental practice. They need regular preventive care, they need restorative work over time, and they need to be able to get to it in every season, not just the quiet ones.',
      },
      {
        type: 'p',
        text: 'Plantations Professional Park sits just off the Coastal Highway and Route 1 corridor, with access from the Route 24 and Route 9 corridors. In practice that means patients coming from Lewes, Harbeson, Milton, Long Neck, and Millsboro are not routed through the busiest stretch of downtown to keep a cleaning appointment.',
      },
      { type: 'h2', text: 'Visitors still matter' },
      {
        type: 'p',
        text: 'None of that means we are uninterested in helping someone whose crown comes off on the second day of a beach week. A dentist who can see an urgent problem is a genuinely useful thing for a resort community to have, and it is part of what we intend to offer once we open.',
      },
      {
        type: 'p',
        text: 'The point is the order. Serve the residents well, and the practice is stable enough to be there for the visitor too.',
      },
      { type: 'h2', text: 'A professional park, on purpose' },
      {
        type: 'p',
        text: 'A professional park also gives us something a converted retail space usually cannot: a building designed for the mechanical and infrastructure requirements of a modern dental office, and room to lay out operatories properly rather than fitting them around someone else’s floor plan.',
      },
      {
        type: 'p',
        text: 'Parking and accessible entry details will be published once construction is far enough along for us to describe them accurately. We are not going to make claims about the parking lot before the parking lot exists.',
      },
    ],
    reviewedBy: null,
    related: ['a-new-dental-office-is-coming-to-rehoboth-beach', 'what-to-expect-from-the-new-office'],
  },

  {
    slug: 'what-to-expect-from-the-new-office',
    title: 'What Patients Can Expect From the New Office',
    description:
      'The principles shaping Smile Studio of Rehoboth: unhurried appointments, plain-language explanations, and written costs before treatment.',
    date: '2026-08-19',
    category: 'Our New Office',
    readingTime: '4 min read',
    excerpt:
      'We cannot show you the finished office yet. We can tell you what we are trying to build, and what we are deliberately not promising.',
    body: [
      {
        type: 'p',
        text: 'A new practice gets to decide how it works before habits set in. These are the decisions we have made, written down while they are still easy to hold ourselves to.',
      },
      { type: 'h2', text: 'You will know what is happening before it happens' },
      {
        type: 'p',
        text: 'No treatment gets started without an explanation you actually followed and a cost you have seen in writing. If a plan has more than one reasonable option, and most do, you will hear about the alternatives with their trade-offs, not just the one we would pick.',
      },
      { type: 'h2', text: 'Appointments that run on time' },
      {
        type: 'p',
        text: 'Running late is a scheduling decision disguised as bad luck. We are building the schedule with enough room in it that a normal appointment does not push the next three back.',
      },
      { type: 'h2', text: 'A gap in care is not a moral failing' },
      {
        type: 'p',
        text: 'People stop going to the dentist for ordinary reasons: a move, a job change, a bad experience, or the cost. If it has been a while, that is information we need in order to help, not something to apologize for. The first visit can be a conversation only if that is what makes it possible.',
      },
      { type: 'h2', text: 'What we are not promising' },
      {
        type: 'p',
        text: 'We are not going to tell you that dentistry here will be pain-free, because nobody can promise how another person will feel. We will tell you what comfort measures are available, we will explain what you are likely to notice, and we will stop when you need us to stop.',
      },
      {
        type: 'p',
        text: 'We are also not going to describe technology we have not installed or services we have not confirmed. When the operatories are equipped and clinical leadership has signed off on the service list, that information goes on this website. Not before.',
      },
      { type: 'h2', text: 'What happens next' },
      {
        type: 'p',
        text: 'Construction continues, and we will post real progress as it happens. If you would like the confirmed opening date and early scheduling information before it is public, the opening list is the place to be.',
      },
    ],
    reviewedBy: null,
    related: ['a-new-dental-office-is-coming-to-rehoboth-beach', 'why-we-chose-the-plantations-road-location'],
  },
]

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export const postSlugs = posts.map((p) => p.slug)

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
