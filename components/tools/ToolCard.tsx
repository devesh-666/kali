import React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { clsx } from "clsx"
import Badge from "@/components/ui/Badge"

interface Tool {
  name: string
  slug: string
  category: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  tags: string[]
  featured?: boolean
}

interface ToolCardProps {
  tool: Tool
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={clsx(
        "group block rounded-lg border",
        "bg-[#111111] dark:bg-[#111111]",
        "border-[#1a1a1a] dark:border-[#1a1a1a]",
        "hover:border-green-500/50 dark:hover:border-green-500/50",
        "transition-all duration-200 ease-in-out",
        "hover:shadow-lg",
        tool.featured
          ? "hover:shadow-green-500/10 shadow-green-500/5 shadow-md"
          : "hover:shadow-black/40"
      )}
    >
      {/* Optional featured glow ring */}
      {tool.featured && (
        <div className="absolute inset-0 rounded-lg ring-1 ring-green-500/20 pointer-events-none" />
      )}

      <div className="relative p-5 flex flex-col gap-3 h-full">
        {/* Top: badges */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <Badge variant="category">{tool.category}</Badge>
          <Badge variant={tool.difficulty}>{tool.difficulty}</Badge>
        </div>

        {/* Middle: name + description */}
        <div className="flex-1">
          <h3
            className={clsx(
              "font-mono font-semibold text-green-400 text-lg leading-snug mb-2",
              "group-hover:text-green-300 transition-colors duration-150"
            )}
          >
            {tool.name}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Bottom: tags + link */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#1a1a1a]">
          {/* First 3 tags */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {tool.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono text-gray-600 bg-[#1a1a1a] px-1.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View tool link */}
          <span
            className={clsx(
              "flex items-center gap-1 text-xs font-mono text-gray-500 flex-shrink-0",
              "group-hover:text-green-400 transition-colors duration-150"
            )}
          >
            View Tool
            <ArrowRight
              size={12}
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  )
}
