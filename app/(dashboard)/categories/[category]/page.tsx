export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { toolsData, categories } from '@/data/tools'
import ToolCard from '@/components/tools/ToolCard'
import { ChevronRight, Layers } from 'lucide-react'

interface PageProps {
  params: { category: string }
}

export default async function CategoryPage({ params }: PageProps) {
  const category = categories.find((c) => c.slug === params.category.toLowerCase())

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="font-mono text-center space-y-2">
          <p className="text-green-500 text-sm">
            $ find /categories -name &quot;{params.category}&quot;
          </p>
          <p className="text-red-400 mt-3 text-lg font-bold">404: Category Not Found</p>
          <p className="text-gray-500 text-sm">
            The category{' '}
            <span className="text-gray-300">{params.category}</span> does not exist.
          </p>
        </div>
        <Link
          href="/categories"
          className="mt-4 px-4 py-2 rounded-md border border-green-500/50 text-green-500 font-mono text-sm hover:bg-green-500/10 transition-colors"
        >
          ← Back to Categories
        </Link>
      </div>
    )
  }

  const tools = toolsData
    .filter((t) => t.category === category.name)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((t) => ({
      _id: t.slug,
      name: t.name,
      slug: t.slug,
      category: t.category,
      description: t.description,
      difficulty: t.difficulty,
      tags: t.tags ?? [],
      featured: t.featured ?? false,
    }))

  const difficultyCounts = tools.reduce<Record<string, number>>((acc, t) => {
    acc[t.difficulty] = (acc[t.difficulty] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs font-mono text-gray-500">
        <Link href="/categories" className="hover:text-green-400 transition-colors">
          Categories
        </Link>
        <ChevronRight size={12} className="text-gray-700" />
        <span className="text-gray-300">{category.name}</span>
      </nav>

      {/* Category header */}
      <section>
        <div className="flex items-start gap-5">
          {category.icon && (
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-4xl bg-[#1a1a1a] flex-shrink-0"
              style={{ boxShadow: `0 0 0 1px ${category.color}33` }}
            >
              {category.icon}
            </div>
          )}
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 text-gray-500 font-mono text-xs">
              <Layers size={12} className="text-cyan-400" />
              <span>category</span>
            </div>
            <h1
              className="text-2xl sm:text-3xl font-mono font-bold"
              style={{ color: category.color }}
            >
              {category.name}
            </h1>
            {category.description && (
              <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                {category.description}
              </p>
            )}

            {/* Stats bar */}
            <div className="flex items-center gap-3 flex-wrap pt-1">
              <span className="text-xs font-mono text-gray-600 bg-[#1a1a1a] px-2.5 py-1 rounded-full">
                {tools.length} tool{tools.length !== 1 ? 's' : ''}
              </span>
              {Object.entries(difficultyCounts).map(([diff, count]) => {
                const colorMap: Record<string, string> = {
                  Beginner: 'text-green-400 bg-green-400/10',
                  Intermediate: 'text-yellow-400 bg-yellow-400/10',
                  Advanced: 'text-red-400 bg-red-400/10',
                }
                return (
                  <span
                    key={diff}
                    className={`text-xs font-mono px-2.5 py-1 rounded-full ${colorMap[diff] ?? 'text-gray-400 bg-gray-400/10'}`}
                  >
                    {count} {diff.toLowerCase()}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tools grid */}
      {tools.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-lg border border-[#1a1a1a] bg-[#111111]">
          <p className="font-mono text-gray-500 text-sm">No tools in this category yet.</p>
        </div>
      ) : (
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
      )}
    </div>
  )
}
