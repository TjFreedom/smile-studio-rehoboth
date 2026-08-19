import type { MetadataRoute } from 'next'
import { practiceName, practiceNameShort } from '@/config/practice'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${practiceName} Dentistry`,
    short_name: practiceNameShort,
    description:
      'Modern dentistry coming to Rehoboth Beach, Delaware. A Freedom Dental Health Practice.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F4F7FA',
    theme_color: '#0B2859',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
  }
}
