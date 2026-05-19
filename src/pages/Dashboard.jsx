import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Sparkles } from 'lucide-react'
import { artifacts } from '../artifacts/index.js'

export default function Dashboard() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return artifacts
    return artifacts.filter((a) => {
      const haystack = [a.title, a.description, ...(a.tags ?? [])]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [query])

  return (
    <div className="min-h-screen">
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Sparkles className="h-4 w-4" />
            <span>Visual Math</span>
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Interactive artifacts
          </h1>
          <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
            A collection of small interactive React experiments. Click any card to
            open the artifact.
          </p>

          <div className="relative mt-6 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search artifacts…"
              className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-600"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-300 px-6 py-12 text-center text-zinc-500 dark:border-zinc-700">
            No artifacts match "{query}".
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <li key={a.slug}>
                <Link
                  to={`/a/${a.slug}`}
                  className="group block overflow-hidden rounded-xl border border-zinc-200 bg-white transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                >
                  <div
                    className={`h-28 bg-gradient-to-br ${a.accent ?? 'from-zinc-400 to-zinc-600'}`}
                  />
                  <div className="p-5">
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                      {a.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {a.description}
                    </p>
                    {a.tags?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {a.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>

      <footer className="mx-auto max-w-6xl px-6 pb-10 text-sm text-zinc-500">
        {artifacts.length} artifact{artifacts.length === 1 ? '' : 's'}
      </footer>
    </div>
  )
}
