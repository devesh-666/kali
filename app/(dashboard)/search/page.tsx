'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, useCallback, Suspense } from 'react'
import SearchBar from '@/components/ui/SearchBar'
import ToolCard from '@/components/tools/ToolCard'
import { Search, Lightbulb } from 'lucide-react'

interface Tool {
  _id: string
  name: string
  slug: string
  category: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  featured?: boolean
}

const SUGGESTIONS = [
  'nmap', 'metasploit', 'wireshark', 'burpsuite', 'sqlmap',
  'aircrack', 'john', 'hashcat', 'nikto', 'gobuster',
]

function SkeletonCard() {
  return (
    <div className="rounded-lg border border-[#1a1a1a] bg-[#111111] p-5 space-y-3 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 w-20 bg-[#1a1a1a] rounded-full" />
        <div className="h-4 w-16 bg-[#1a1a1a] rounded-full" />
      </div>
      <div className="h-5 w-3/5 bg-[#1a1a1a] rounded" />
      <div className="space-y-1.5">
        <div className="h-3 w-full bg-[#1a1a1a] rounded" />
        <div className="h-3 w-4/5 bg-[#1a1a1a] rounded" />
      </div>
      <div className="flex gap-2 pt-2 border-t border-[#1a1a1a]">
        <div className="h-4 w-12 bg-[#1a1a1a] rounded-full" />
        <div className="h-4 w-14 bg-[#1a1a1a] rounded-full" />
      </div>
    </div>
  )
}

function SearchPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const q = searchParams.get('q') ?? ''

  const [query, setQuery] = useState(q)
  const [results, setResults] = useState<Tool[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const doSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      setSearched(false)
      return
    }

    setLoading(true)
    setSearched(true)

    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery.trim())}`,
        { cache: 'no-store' }
      )
      if (!res.ok) throw new Error('Search failed')
      const data = await res.json()
      setResults(data.tools ?? [])
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Sync URL param → query state
  useEffect(() => {
    setQuery(q)
    if (q) {
      doSearch(q)
    } else {
      setResults([])
      setSearched(false)
    }
  }, [q, doSearch])

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value)
      const params = new URLSearchParams()
      if (value.trim()) params.set('q', value.trim())
      router.replace(`/search${value.trim() ? `?${params.toString()}` : ''}`)
    },
    [router]
  )

  const handleSuggestionClick = (s: string) => {
    handleSearch(s)
  }

  return (
    <div className="space-y-7">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-gray-500 font-mono text-xs mb-2">
          <span className="text-green-500">$</span>
          <span>grep -r &quot;...&quot; /tools</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-mono font-bold text-gray-100">
          Search
        </h1>
        <p className="text-gray-500 text-sm mt-1 font-mono">
          Search tools by name, description, tags, or commands.
        </p>
      </div>

      {/* SearchBar */}
      <div className="max-w-xl">
        <SearchBar
          onSearch={handleSearch}
          initialValue={query}
          placeholder="Search tools, tags, commands..."
        />
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div>
          <div className="h-4 w-40 bg-[#1a1a1a] rounded animate-pulse mb-5" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {!loading && searched && (
        <>
          <p className="text-xs font-mono text-gray-500">
            {results.length === 0 ? (
              <>No results for <span className="text-gray-300">&quot;{query}&quot;</span></>
            ) : (
              <>
                Found <span className="text-green-400">{results.length}</span> result
                {results.length !== 1 ? 's' : ''} for{' '}
                <span className="text-gray-300">&quot;{query}&quot;</span>
              </>
            )}
          </p>

          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 rounded-lg border border-[#1a1a1a] bg-[#111111] space-y-4">
              <Search size={32} className="text-gray-700" />
              <div className="font-mono text-center space-y-1">
                <p className="text-gray-400">No tools matched your search.</p>
                <p className="text-gray-600 text-xs">
                  Try a different keyword or browse by category.
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-center max-w-sm">
                <span className="text-xs font-mono text-gray-600">Try:</span>
                {SUGGESTIONS.slice(0, 6).map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestionClick(s)}
                    className="text-xs font-mono text-green-500 hover:text-green-300 bg-green-500/10 hover:bg-green-500/20 px-2.5 py-1 rounded-full transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((tool) => (
                <ToolCard key={tool._id} tool={tool} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Initial state (no query yet) */}
      {!loading && !searched && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
            <Lightbulb size={13} className="text-yellow-400" />
            <span>Suggestions</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSuggestionClick(s)}
                className="text-sm font-mono text-gray-400 hover:text-gray-100 bg-[#111111] hover:bg-[#1a1a1a] border border-[#1a1a1a] hover:border-gray-600 px-3 py-1.5 rounded-lg transition-all duration-150"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-[#1a1a1a] bg-[#111111] p-6 font-mono text-sm space-y-1.5">
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">Tips</p>
            <p className="text-gray-400">
              <span className="text-green-500">•</span> Search by tool name:{' '}
              <span className="text-cyan-400">nmap</span>
            </p>
            <p className="text-gray-400">
              <span className="text-green-500">•</span> Search by tag:{' '}
              <span className="text-cyan-400">port-scan</span>
            </p>
            <p className="text-gray-400">
              <span className="text-green-500">•</span> Search by category:{' '}
              <span className="text-cyan-400">reconnaissance</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="font-mono text-gray-500 text-sm">Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  )
}
