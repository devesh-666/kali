export const dynamic = 'force-dynamic'

import { Terminal, Layers, Star } from 'lucide-react'
import { toolsData, categories } from '@/data/tools'
import ToolCard from '@/components/tools/ToolCard'
import CategoryCard from '@/components/tools/CategoryCard'

export default async function DashboardPage() {

  const featuredTools = toolsData.filter((t) => t.featured)
  const recentTools = toolsData.slice(-6).reverse()

  const stats = [
    {
      label: 'Total Tools',
      value: toolsData.length,
      icon: Terminal,
      color: 'text-green-400',
      bg: 'bg-green-400/10',
      border: 'border-green-400/20',
    },
    {
      label: 'Categories',
      value: categories.length,
      icon: Layers,
      color: 'text-cyan-400',
      bg: 'bg-cyan-400/10',
      border: 'border-cyan-400/20',
    },
    {
      label: 'Featured',
      value: featuredTools.length,
      icon: Star,
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10',
      border: 'border-yellow-400/20',
    },
  ]

  const categoriesWithCount = categories.map((c) => ({
    _id: c.slug,
    name: c.name,
    slug: c.slug,
    description: c.description ?? '',
    icon: c.icon ?? '',
    color: c.color ?? '#22c55e',
    toolCount: toolsData.filter((t) => t.category === c.name).length,
  }))

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-gray-500 font-mono text-sm">
          <span className="text-green-500">$</span>
          <span>whoami</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-mono font-bold text-gray-100">
          Welcome back,{' '}
          <span className="text-green-400 terminal-cursor">Hacker</span>
        </h1>
        <p className="text-gray-400 text-lg font-mono">Your security research hub</p>
        <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">
          Browse the complete reference for Kali Linux tools — commands, use cases, and
          techniques for penetration testing and security research.
        </p>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className={`rounded-lg border ${stat.border} ${stat.bg} p-5 flex items-center gap-4`}
            >
              <div className={`p-2 rounded-lg ${stat.bg} border ${stat.border}`}>
                <Icon size={20} className={stat.color} />
              </div>
              <div>
                <p className={`text-2xl font-mono font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-0.5">
                  {stat.label}
                </p>
              </div>
            </div>
          )
        })}
      </section>

      {/* Featured Tools */}
      {featuredTools.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Star size={16} className="text-yellow-400" />
            <h2 className="text-lg font-mono font-semibold text-gray-200">Featured Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTools.map((tool) => (
              <ToolCard
                key={tool.slug}
                tool={{
                  name: tool.name,
                  slug: tool.slug,
                  category: tool.category,
                  description: tool.description,
                  difficulty: tool.difficulty.toLowerCase() as
                    | 'beginner'
                    | 'intermediate'
                    | 'advanced',
                  tags: tool.tags ?? [],
                  featured: tool.featured ?? false,
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Layers size={16} className="text-cyan-400" />
          <h2 className="text-lg font-mono font-semibold text-gray-200">Categories</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categoriesWithCount.map((cat) => (
            <CategoryCard key={cat._id} category={cat} />
          ))}
        </div>
      </section>

      {/* Recently Added */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Terminal size={16} className="text-green-400" />
          <h2 className="text-lg font-mono font-semibold text-gray-200">Recently Added</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentTools.map((tool) => (
            <ToolCard
              key={tool.slug}
              tool={{
                name: tool.name,
                slug: tool.slug,
                category: tool.category,
                description: tool.description,
                difficulty: tool.difficulty.toLowerCase() as
                  | 'beginner'
                  | 'intermediate'
                  | 'advanced',
                tags: tool.tags ?? [],
                featured: tool.featured ?? false,
              }}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
