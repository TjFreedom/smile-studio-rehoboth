import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

// `next lint` was removed in Next.js 16. `npm run lint` now runs ESLint
// directly against this flat config, which carries the same Next.js rules.
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    '.next/**',
    // Netlify CLI's local build cache. Already gitignored.
    '.netlify/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'marketing/**',
    'public/**',
  ]),
])
