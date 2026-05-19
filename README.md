# Visual Math

A small dashboard for hosting interactive React artifacts (the kind you build in
Claude). Each artifact is a self-contained component; the dashboard auto-generates
cards and routes from a single registry file.

## Run locally

```bash
npm install
npm run dev
```

## Add a new artifact

1. Drop a `.jsx` file in `src/artifacts/` that **default-exports** a React component.
2. Open [`src/artifacts/index.js`](src/artifacts/index.js) and add an entry:

   ```js
   {
     slug: 'my-thing',                          // URL: /a/my-thing
     title: 'My Thing',
     description: 'What it does in one line.',
     tags: ['math', 'demo'],
     accent: 'from-rose-500 to-orange-500',     // tailwind gradient classes
     component: lazy(() => import('./MyThing.jsx')),
   }
   ```

That's it — it'll show up on the dashboard and be routable at `/#/a/my-thing`.

### Pasting code from a Claude artifact

Most Claude artifacts work as-is. Watch for:

- **Default export** — Claude often writes `export default function MyThing() {…}`. Keep it.
- **Imports already bundled here**: `react`, `lucide-react`, `recharts`, `react-router-dom`.
- **Anything else** (shadcn/ui, framer-motion, mathjs, etc.) — install with `npm i <pkg>`.
- **Tailwind classes** work out of the box (Tailwind v4 via `@tailwindcss/vite`).

## Deploy to GitHub Pages

1. Push the repo to GitHub.
2. In `vite.config.js`, set `base: '/<repo-name>/'` if the repo isn't served at the
   root (e.g. `base: '/visual-math/'`). For a user/org page (`<user>.github.io`),
   leave `base: './'`.
3. Run:

   ```bash
   npm run deploy
   ```

   This builds and pushes `dist/` to the `gh-pages` branch.
4. In GitHub → Settings → Pages, set source to the `gh-pages` branch.

The app uses `HashRouter` so deep links work on static hosting without extra config.

## Project layout

```
src/
  App.jsx                     # routing
  main.jsx                    # HashRouter root
  index.css                   # tailwind import + base styles
  pages/Dashboard.jsx         # the list view
  artifacts/
    index.js                  # the registry (one entry per artifact)
    SineWaveExplorer.jsx      # sample artifact
```
