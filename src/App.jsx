import { Suspense } from 'react'
import { Routes, Route, Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Dashboard from './pages/Dashboard.jsx'
import { artifactBySlug } from './artifacts/index.js'

function ArtifactPage() {
  const { slug } = useParams()
  const artifact = artifactBySlug(slug)

  if (!artifact) return <Navigate to="/" replace />

  const Component = artifact.component

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
          <h1 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {artifact.title}
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">
        <Suspense fallback={<div className="text-zinc-500">Loading…</div>}>
          <Component />
        </Suspense>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/a/:slug" element={<ArtifactPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
