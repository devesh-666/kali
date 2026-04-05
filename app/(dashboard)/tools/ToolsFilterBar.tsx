'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'
import { Search, X, Filter } from 'lucide-react'
import { clsx } from 'clsx'

interface Category {
  _id: string
  name: string
  slug: string
}

interface ToolsFilterBarProps {
  categories: Category[]
  difficulties: string[]
  currentCategory: string
  currentDifficulty: string
  currentSearch: string
}

export default function ToolsFilterBar({
  categories,
  difficulties,
  currentCategory,
  currentDifficulty,
  currentSearch,
}: ToolsFilterBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState(currentSearch)

  const updateFilters = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams()
      const merged = {
        category: currentCategory,
        difficulty: currentDifficulty,
        search: currentSearch,
        ...updates,
      }
      if (merged.category) params.set('category', merged.category)
      if (merged.difficulty) params.set('difficulty', merged.difficulty)
      if (merged.search) params.set('search', merged.search)
      // Reset to page 1 on filter change
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`)
      })
    },
    [currentCategory, currentDifficulty, currentSearch, pathname, router]
  )

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters({ search, page: '1' })
  }

  const clearAll = () => {
    setSearch('')
    startTransition(() => {
      router.push(pathname)
    })
  }

  const hasFilters = currentCategory || currentDifficulty || currentSearch

  return (
    <div className="space-y-3">
      {/* Search + filter row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <Search size={15} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools, tags..."
            className={clsx(
              'w-full pl-9 pr-4 py-2.5 text-sm font-mono rounded-lg',
              'bg-[#111111] border border-[#1a1a1a] text-gray-200',
              'placeholder:text-gray-600',
              'focus:outline-none focus:border-green-500/60 focus:ring-1 focus:ring-green-500/20',
              'transition-colors duration-150'
            )}
          />
        </form>

        {/* Category dropdown */}
        <select
          value={currentCategory}
          onChange={(e) => updateFilters({ category: e.target.value, page: '1' })}
          className={clsx(
            'px-3 py-2.5 text-sm font-mono rounded-lg',
            'bg-[#111111] border border-[#1a1a1a] text-gray-400',
            'focus:outline-none focus:border-green-500/60',
            'transition-colors duration-150 cursor-pointer'
          )}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Difficulty filter */}
        <div className="flex items-center gap-1.5">
          <Filter size={14} className="text-gray-600 flex-shrink-0" />
          {difficulties.map((diff) => {
            const colorMap: Record<string, string> = {
              beginner: 'text-green-400 border-green-400/30 bg-green-400/10',
              intermediate: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
              advanced: 'text-red-400 border-red-400/30 bg-red-400/10',
            }
            const isActive = currentDifficulty === diff
            return (
              <button
                key={diff}
                onClick={() =>
                  updateFilters({ difficulty: isActive ? '' : diff, page: '1' })
                }
                className={clsx(
                  'px-2.5 py-1.5 rounded text-xs font-mono border capitalize transition-all duration-150',
                  isActive
                    ? colorMap[diff]
                    : 'text-gray-500 border-[#1a1a1a] bg-[#111111] hover:border-gray-600 hover:text-gray-300'
                )}
              >
                {diff}
              </button>
            )
          })}
        </div>
      </div>

      {/* Active filters + clear */}
      {hasFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono text-gray-600">Active filters:</span>
          {currentCategory && (
            <FilterChip
              label={`category: ${currentCategory}`}
              onRemove={() => updateFilters({ category: '', page: '1' })}
            />
          )}
          {currentDifficulty && (
            <FilterChip
              label={`difficulty: ${currentDifficulty}`}
              onRemove={() => updateFilters({ difficulty: '', page: '1' })}
            />
          )}
          {currentSearch && (
            <FilterChip
              label={`search: "${currentSearch}"`}
              onRemove={() => {
                setSearch('')
                updateFilters({ search: '', page: '1' })
              }}
            />
          )}
          <button
            onClick={clearAll}
            className="text-xs font-mono text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
          >
            <X size={11} /> Clear all
          </button>
        </div>
      )}

      {isPending && (
        <div className="h-0.5 w-full bg-[#1a1a1a] rounded overflow-hidden">
          <div className="h-full bg-green-500 animate-pulse rounded" />
        </div>
      )}
    </div>
  )
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono bg-green-500/10 border border-green-500/20 text-green-400">
      {label}
      <button
        onClick={onRemove}
        aria-label="Remove filter"
        className="hover:text-green-200 transition-colors ml-0.5"
      >
        <X size={10} />
      </button>
    </span>
  )
}
