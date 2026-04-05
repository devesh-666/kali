'use client'

import React from "react"
import Link from "next/link"
import { clsx } from "clsx"

interface Category {
  name: string
  slug: string
  description: string
  icon: string
  color: string
  toolCount: number
}

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className={clsx(
        "group block rounded-xl p-6",
        "bg-[#111111] dark:bg-[#111111]",
        "transition-all duration-200 ease-in-out",
        "hover:shadow-lg hover:shadow-black/40",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50",
        // border via the border class + inline style override on hover handled by CSS var
        "border border-[#1a1a1a]"
      )}
      // Tailwind can't use runtime values, so we use onMouseEnter/Leave for border color
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLAnchorElement).style.borderColor = category.color
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLAnchorElement).style.borderColor = ""
      }}
    >
      <div className="flex flex-col gap-4">
        {/* Large icon */}
        <div
          className={clsx(
            "w-14 h-14 rounded-xl flex items-center justify-center text-3xl",
            "bg-[#1a1a1a] transition-transform duration-200",
            "group-hover:scale-105"
          )}
          style={{ boxShadow: `0 0 0 1px ${category.color}33` }}
        >
          {category.icon}
        </div>

        {/* Name + description */}
        <div>
          <h3 className="font-mono font-semibold text-gray-100 text-base leading-snug mb-1.5 group-hover:text-white transition-colors duration-150">
            {category.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Footer: tool count + explore */}
        <div className="flex items-center justify-between pt-2 border-t border-[#1a1a1a]">
          <span className="text-xs font-mono text-gray-600">
            {category.toolCount} {category.toolCount === 1 ? "tool" : "tools"}
          </span>
          <span
            className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ color: category.color }}
          >
            Explore →
          </span>
        </div>
      </div>
    </Link>
  )
}
