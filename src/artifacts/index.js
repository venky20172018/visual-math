import { lazy } from 'react'

// Register each artifact once here. Slug -> meta + lazy-loaded component.
// To add a new artifact:
//   1. Drop the .jsx file in src/artifacts/ (default-export the component)
//   2. Add an entry below
//
// Use `tags` for filtering on the dashboard, `accent` for the card color.

export const artifacts = [
  {
    slug: 'sine-wave-explorer',
    title: 'Sine Wave Explorer',
    description: 'Interactive sine wave with adjustable amplitude, frequency, and phase.',
    tags: ['math', 'trigonometry', 'interactive'],
    accent: 'from-indigo-500 to-purple-500',
    component: lazy(() => import('./SineWaveExplorer.jsx')),
  },
]

export const artifactBySlug = (slug) =>
  artifacts.find((a) => a.slug === slug) ?? null
