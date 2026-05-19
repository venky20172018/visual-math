import { lazy } from 'react'

// Register each artifact once here. Slug -> meta + lazy-loaded component.
// To add a new artifact:
//   1. Drop the .jsx file in src/artifacts/ (default-export the component)
//   2. Add an entry below
//
// Use `tags` for filtering on the dashboard, `accent` for the card color.

export const artifacts = [
  {
    slug: 'algebraic-expression-visualizer',
    title: 'Algebraic Expression Visualizer',
    description: 'Evaluate up to four algebraic expressions at a given x and chart the results.',
    tags: ['math', 'algebra', 'chart'],
    accent: 'from-emerald-500 to-teal-500',
    component: lazy(() => import('./AlgebraicExpressionVisualizer.jsx')),
  },
  {
    slug: 'hcf',
    title: 'HCF Visualizer',
    description: 'Step through the Euclidean algorithm and see common factors of two numbers.',
    tags: ['math', 'number-theory'],
    accent: 'from-amber-500 to-orange-500',
    component: lazy(() => import('./hcf.jsx')),
  },
  {
    slug: 'lcm',
    title: 'LCM Visualizer',
    description: 'Compare multiples of two numbers and highlight the lowest common multiple.',
    tags: ['math', 'number-theory'],
    accent: 'from-sky-500 to-blue-500',
    component: lazy(() => import('./lcm.jsx')),
  },
  {
    slug: 'ratio',
    title: 'Ratio Visualization',
    description: 'Adjust a:b and see the ratio rendered as bars, circles, and percentages.',
    tags: ['math', 'ratios'],
    accent: 'from-pink-500 to-rose-500',
    component: lazy(() => import('./ratio.jsx')),
  },
  {
    slug: 'proportionality',
    title: 'Proportionality Calculator',
    description: 'Check whether a:b :: c:d and visualize each ratio side-by-side.',
    tags: ['math', 'ratios'],
    accent: 'from-fuchsia-500 to-purple-500',
    component: lazy(() => import('./proportionality.jsx')),
  },
  {
    slug: 'kepler',
    title: "Kepler's Laws",
    description: 'Interactive demonstration of all three of Kepler\'s laws of planetary motion.',
    tags: ['physics', 'astronomy', 'animation'],
    accent: 'from-violet-500 to-indigo-600',
    component: lazy(() => import('./kepler.jsx')),
  },
  {
    slug: 'youngs-modulus',
    title: "Young's Modulus Arena",
    description: 'Stretch four materials and watch how stiffness shapes their response to force.',
    tags: ['physics', 'materials'],
    accent: 'from-red-500 to-orange-600',
    component: lazy(() => import('./youngs.jsx')),
  },
]

export const artifactBySlug = (slug) =>
  artifacts.find((a) => a.slug === slug) ?? null
