export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import { toolsData, categories } from '@/data/tools'
import ToolCard from '@/components/tools/ToolCard'
import ToolsFilterBar from './ToolsFilterBar'
import { Terminal } from 'lucide-react'
import Link from 'next/link'

interface SearchParams {
  category?: string
  difficulty?: string
  search?: string
  page?: string
}

const PER_PAGE = 12

function getToolsData(params: SearchParams) {
  let filtered = [...toolsData]

  if (params.category) {
    const cat = categories.find((c) => c.slug === params.category)
    const catName = cat ? cat.name : params.category
    filtered = filtered.filter((t) => t.category === catName)
  }

  if (params.difficulty) {
    const diffMap: Record<string, string> = {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
    }
    const normalized = diffMap[params.difficulty.toLowerCase()] ?? params.difficulty
    filtered = filtered.filter((t) => t.difficulty === normalized)
  }

  if (params.search) {
    const q = params.search.toLowerCase()
    filtered = filtered.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        (t.tags ?? []).some((tag) => tag.toLowerCase().includes(q))
    )
  }

  const total = filtered.length
  const page = Math.max(1, parseInt(params.page ?? '1', 10))
  const skip = (page - 1) * PER_PAGE
  const tools = filtered.slice(skip, skip + PER_PAGE)
  const totalPages = Math.ceil(total / PER_PAGE)

  return {
    tools: tools.map((t) => ({
      _id: t.slug,
      name: t.name,
      slug: t.slug,
      category: t.category,
      description: t.description,
      difficulty: t.difficulty,
      tags: t.tags ?? [],
      featured: t.featured ?? false,
    })),
    total,
    page,
    totalPages,
    categories: categories.map((c) => ({
      _id: c.slug,
      name: c.name,
      slug: c.slug,
    })),
  }
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { tools, total, page, totalPages, categories: cats } = getToolsData(searchParams)

  const difficulties = ['beginner', 'intermediate', 'advanced']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gray-500 font-mono text-xs mb-2">
            <Terminal size={12} className="text-green-500" />
            <span className="text-green-500">$</span>
            <span>ls /tools</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-mono font-bold text-gray-100">
            All Tools
          </h1>
          <p className="text-gray-500 font-mono text-sm mt-1">
            {total} tool{total !== 1 ? 's' : ''} available
          </p>
        </div>
      </div>

      {/* Filter bar (client component) */}
      <ToolsFilterBar
        categories={cats}
        difficulties={difficulties}
        currentCategory={searchParams.category ?? ''}
        currentDifficulty={searchParams.difficulty ?? ''}
        currentSearch={searchParams.search ?? ''}
      />

      {/* Results */}
      {tools.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-lg border border-[#1a1a1a] bg-[#111111]">
          <div className="font-mono text-gray-600 text-sm space-y-1 text-center">
            <p className="text-green-500 text-base">$ grep -r &quot;{searchParams.search ?? 'tool'}&quot; /tools</p>
            <p className="text-red-400 mt-3">grep: no matches found</p>
            <p className="text-gray-500 mt-4">No tools found matching your query.</p>
            <p className="text-gray-600 text-xs mt-1">Try adjusting your filters or search term.</p>
          </div>
          <Link
            href="/tools"
            className="mt-6 px-4 py-2 rounded-md border border-green-500/50 text-green-500 font-mono text-sm hover:bg-green-500/10 transition-colors"
          >
            Clear filters
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <ToolCard
                key={tool._id}
                tool={{
                  name: tool.name,
                  slug: tool.slug,
                  category: tool.category,
                  description: tool.description,
                  difficulty: tool.difficulty.toLowerCase() as
                    | 'beginner'
                    | 'intermediate'
                    | 'advanced',
                  tags: tool.tags,
                  featured: tool.featured,
                }}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              {page > 1 && (
                <PaginationLink
                  href={buildPageHref(searchParams, page - 1)}
                  label="← Prev"
                />
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => Math.abs(p - page) <= 2 || p === 1 || p === totalPages)
                .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                  if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) {
                    acc.push('...')
                  }
                  acc.push(p)
                  return acc
                }, [])
                .map((p, i) =>
                  p === '...' ? (
                    <span key={`ellipsis-${i}`} className="px-2 font-mono text-gray-600">
                      ...
                    </span>
                  ) : (
                    <PaginationLink
                      key={p}
                      href={buildPageHref(searchParams, p as number)}
                      label={String(p)}
                      active={p === page}
                    />
                  )
                )}
              {page < totalPages && (
                <PaginationLink
                  href={buildPageHref(searchParams, page + 1)}
                  label="Next →"
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

function buildPageHref(params: SearchParams, page: number) {
  const q = new URLSearchParams()
  if (params.category) q.set('category', params.category)
  if (params.difficulty) q.set('difficulty', params.difficulty)
  if (params.search) q.set('search', params.search)
  q.set('page', String(page))
  return `/tools?${q.toString()}`
}

function PaginationLink({
  href,
  label,
  active = false,
}: {
  href: string
  label: string
  active?: boolean
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded font-mono text-sm border transition-colors duration-150 ${
        active
          ? 'bg-green-500/20 border-green-500/50 text-green-400'
          : 'bg-[#111111] border-[#1a1a1a] text-gray-400 hover:border-gray-600 hover:text-gray-200'
      }`}
    >
      {label}
    </Link>
  )
}
