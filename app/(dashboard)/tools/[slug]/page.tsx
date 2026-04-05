export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, CheckCircle2, Tag, Terminal } from 'lucide-react'
import { toolsData } from '@/data/tools'
import ToolCard from '@/components/tools/ToolCard'
import CommandBlock from '@/components/tools/CommandBlock'
import CodeBlock from '@/components/ui/CodeBlock'
import Badge from '@/components/ui/Badge'

interface PageProps {
  params: Promise<{ slug: string }>
}

const difficultyColor: Record<string, string> = {
  Beginner: 'text-green-400',
  Intermediate: 'text-yellow-400',
  Advanced: 'text-red-400',
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { slug } = await params
  const tool = toolsData.find((t) => t.slug === slug.toLowerCase())

  if (!tool) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="font-mono text-center space-y-2">
          <p className="text-green-500 text-sm">$ find /tools -name &quot;{slug}&quot;</p>
          <p className="text-red-400 mt-3 text-lg font-bold">404: Tool Not Found</p>
          <p className="text-gray-500 text-sm">
            The tool <span className="text-gray-300">{slug}</span> does not exist in the
            database.
          </p>
        </div>
        <Link
          href="/tools"
          className="mt-4 px-4 py-2 rounded-md border border-green-500/50 text-green-500 font-mono text-sm hover:bg-green-500/10 transition-colors"
        >
          ← Back to Tools
        </Link>
      </div>
    )
  }

  const relatedTools = (tool.relatedTools ?? [])
    .map((name) => toolsData.find((t) => t.name === name))
    .filter((t): t is NonNullable<typeof t> => t !== undefined)

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs font-mono text-gray-500 flex-wrap">
        <Link href="/tools" className="hover:text-green-400 transition-colors">
          Tools
        </Link>
        <ChevronRight size={12} className="text-gray-700" />
        <Link
          href={`/categories/${tool.category.toLowerCase().replace(/\s+/g, '-')}`}
          className="hover:text-green-400 transition-colors"
        >
          {tool.category}
        </Link>
        <ChevronRight size={12} className="text-gray-700" />
        <span className="text-gray-300">{tool.name}</span>
      </nav>

      {/* Hero */}
      <section className="space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 text-gray-600 font-mono text-xs">
              <Terminal size={12} className="text-green-500" />
              <span className="text-green-500">$</span>
              <span>man {tool.name.toLowerCase()}</span>
            </div>
            <h1 className={`text-3xl sm:text-4xl font-mono font-bold text-green-400 glow-green`}>
              {tool.name}
            </h1>
            <p className="text-gray-300 text-base leading-relaxed max-w-2xl">
              {tool.description}
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="category">{tool.category}</Badge>
          <Badge variant={tool.difficulty.toLowerCase()}>
            {tool.difficulty}
          </Badge>
          {tool.featured && (
            <Badge variant="intermediate">⭐ Featured</Badge>
          )}
        </div>
      </section>

      {/* Long description */}
      {tool.longDescription && (
        <section className="rounded-lg border border-[#1a1a1a] bg-[#111111] p-6">
          <h2 className="text-sm font-mono font-semibold text-gray-400 uppercase tracking-widest mb-3">
            About
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line">
            {tool.longDescription}
          </p>
        </section>
      )}

      {/* Use Cases */}
      {(tool.useCases ?? []).length > 0 && (
        <section>
          <h2 className="text-lg font-mono font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-green-500" />
            Use Cases
          </h2>
          <ul className="space-y-2">
            {(tool.useCases ?? []).map((useCase, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed"
              >
                <CheckCircle2 size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Install Command */}
      {tool.installCommand && (
        <section>
          <h2 className="text-lg font-mono font-semibold text-gray-200 mb-4">
            Installation
          </h2>
          <CodeBlock
            code={tool.installCommand}
            language="bash"
            title="Install"
            showCopy
          />
        </section>
      )}

      {/* Commands */}
      {(tool.commands ?? []).length > 0 && (
        <section>
          <h2 className="text-lg font-mono font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <Terminal size={18} className="text-green-500" />
            Commands
            <span className="text-xs font-mono text-gray-600 bg-[#1a1a1a] px-2 py-0.5 rounded-full">
              {(tool.commands ?? []).length}
            </span>
          </h2>
          <div className="space-y-2">
            {(tool.commands ?? []).map((cmd, i) => (
              <CommandBlock key={i} command={cmd} />
            ))}
          </div>
        </section>
      )}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section>
          <h2 className="text-lg font-mono font-semibold text-gray-200 mb-4">
            Related Tools
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2 code-scrollbar">
            {relatedTools.map((t) => (
              <div key={t.slug} className="min-w-[260px] max-w-[280px] flex-shrink-0">
                <ToolCard
                  tool={{
                    name: t.name,
                    slug: t.slug,
                    category: t.category,
                    description: t.description,
                    difficulty: t.difficulty.toLowerCase() as
                      | 'beginner'
                      | 'intermediate'
                      | 'advanced',
                    tags: t.tags ?? [],
                    featured: t.featured ?? false,
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tags */}
      {(tool.tags ?? []).length > 0 && (
        <section className="pt-4 border-t border-[#1a1a1a]">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag size={14} className="text-gray-600 flex-shrink-0" />
            {(tool.tags ?? []).map((tag) => (
              <Link
                key={tag}
                href={`/tools?search=${encodeURIComponent(tag)}`}
                className="text-xs font-mono text-gray-500 bg-[#1a1a1a] hover:bg-[#222222] hover:text-gray-300 px-2.5 py-1 rounded-full transition-colors duration-150"
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
