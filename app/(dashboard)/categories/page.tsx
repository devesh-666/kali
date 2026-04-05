export const dynamic = 'force-dynamic'

import { toolsData, categories } from '@/data/tools'
import CategoryCard from '@/components/tools/CategoryCard'
import { Layers } from 'lucide-react'

export default async function CategoriesPage() {
  const categoriesWithCount = categories.map((cat) => ({
    _id: cat.slug,
    name: cat.name,
    slug: cat.slug,
    description: cat.description ?? '',
    icon: cat.icon ?? '',
    color: cat.color ?? '#22c55e',
    toolCount: toolsData.filter((t) => t.category === cat.name).length,
  }))

  const totalTools = categoriesWithCount.reduce((acc, c) => acc + c.toolCount, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-gray-500 font-mono text-xs mb-2">
          <span className="text-green-500">$</span>
          <span>ls /categories</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-mono font-bold text-gray-100 flex items-center gap-3">
          <Layers size={24} className="text-cyan-400" />
          Categories
        </h1>
        <p className="text-gray-500 text-sm mt-2 max-w-xl">
          Browse all tool categories — from reconnaissance and exploitation to
          post-exploitation and forensics.
        </p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs font-mono text-gray-600 bg-[#1a1a1a] px-2.5 py-1 rounded-full">
            {categoriesWithCount.length} categories
          </span>
          <span className="text-xs font-mono text-gray-600 bg-[#1a1a1a] px-2.5 py-1 rounded-full">
            {totalTools} total tools
          </span>
        </div>
      </div>

      {/* Grid */}
      {categoriesWithCount.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-lg border border-[#1a1a1a] bg-[#111111]">
          <p className="font-mono text-gray-500 text-sm">No categories found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categoriesWithCount.map((cat) => (
            <CategoryCard key={cat._id} category={cat} />
          ))}
        </div>
      )}
    </div>
  )
}
