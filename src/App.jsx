import { Suspense, useState } from 'react'
import { Routes, Route, NavLink, Navigate, useParams } from 'react-router-dom'
import { Sparkles, Menu, X } from 'lucide-react'
import { artifacts, artifactBySlug } from './artifacts/index.js'

function Sidebar({ onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
        <Sparkles className="h-4 w-4 text-indigo-500" />
        <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Visual Math
        </span>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-0.5">
          {artifacts.map((a) => (
            <li key={a.slug}>
              <NavLink
                to={`/a/${a.slug}`}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50'
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                  }`
                }
              >
                {a.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-zinc-200 px-5 py-3 text-xs text-zinc-500 dark:border-zinc-800">
        {artifacts.length} artifacts
      </div>
    </div>
  )
}

function ArtifactView() {
  const { slug } = useParams()
  const artifact = artifactBySlug(slug)

  if (!artifact) return <Navigate to="/" replace />

  const Component = artifact.component

  return (
    <div className="px-6 py-6 sm:px-10 sm:py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {artifact.title}
        </h1>
        {artifact.description && (
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {artifact.description}
          </p>
        )}
      </header>
      <Suspense fallback={<div className="text-zinc-500">Loading…</div>}>
        <Component />
      </Suspense>
    </div>
  )
}

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <aside className="hidden w-64 shrink-0 border-r border-zinc-200 bg-white md:block dark:border-zinc-800 dark:bg-zinc-900">
        <Sidebar />
      </aside>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-40 w-64 border-r border-zinc-200 bg-white md:hidden dark:border-zinc-800 dark:bg-zinc-900">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </aside>
        </>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3 md:hidden dark:border-zinc-800">
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-md p-1.5 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <span className="text-sm font-semibold">Visual Math</span>
        </div>

        <main className="flex-1 overflow-x-hidden">
          <Routes>
            <Route
              path="/"
              element={<Navigate to={`/a/${artifacts[0].slug}`} replace />}
            />
            <Route path="/a/:slug" element={<ArtifactView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return <Layout />
}
