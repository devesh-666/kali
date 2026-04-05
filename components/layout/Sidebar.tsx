"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { clsx } from "clsx"

interface Category {
  name: string
  slug: string
  icon: string
  color: string
  toolCount: number
}

interface SidebarProps {
  categories: Category[]
}

export default function Sidebar({ categories }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (slug: string) =>
    pathname === `/categories/${slug}` || pathname.startsWith(`/categories/${slug}/`)

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className={clsx(
          "md:hidden fixed bottom-5 left-4 z-50",
          "flex items-center gap-2 px-3 py-2 rounded-full",
          "bg-green-500 text-black text-sm font-mono font-semibold",
          "shadow-lg shadow-green-500/30",
          "focus:outline-none"
        )}
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        <span>{mobileOpen ? "Close" : "Categories"}</span>
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          // Base
          "flex flex-col border-r border-[#1a1a1a] bg-[#0a0a0a]",
          "transition-all duration-300 ease-in-out overflow-hidden",
          // Desktop: collapsible width
          "hidden md:flex",
          collapsed ? "w-16" : "w-64",
          // Mobile: fixed drawer
          "max-md:fixed max-md:top-0 max-md:left-0 max-md:bottom-0 max-md:z-40",
          mobileOpen ? "max-md:flex max-md:w-64" : "max-md:hidden"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#1a1a1a] h-14 flex-shrink-0">
          {!collapsed && (
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
              Categories
            </span>
          )}
          <button
            className={clsx(
              "p-1.5 rounded text-gray-600 hover:text-gray-300 hover:bg-gray-800/50",
              "transition-colors duration-150",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50",
              collapsed ? "mx-auto" : "ml-auto"
            )}
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Category list */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-0.5">
          {categories.map((cat) => {
            const active = isActive(cat.slug)
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                title={collapsed ? cat.name : undefined}
                className={clsx(
                  "flex items-center gap-3 px-2 py-2 rounded-md",
                  "transition-all duration-150 group relative",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50",
                  active
                    ? "bg-green-500/10 text-green-400"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                )}
              >
                {/* Icon */}
                <span
                  className={clsx(
                    "text-lg flex-shrink-0 w-6 text-center leading-none",
                    "transition-transform duration-150 group-hover:scale-110"
                  )}
                  style={{ color: active ? cat.color : undefined }}
                >
                  {cat.icon}
                </span>

                {/* Name + count */}
                {!collapsed && (
                  <>
                    <span className="flex-1 text-sm font-mono truncate">{cat.name}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-mono px-1.5 py-0.5 rounded-full",
                        active
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-800 text-gray-600 group-hover:text-gray-400"
                      )}
                    >
                      {cat.toolCount}
                    </span>
                  </>
                )}

                {/* Tooltip when collapsed */}
                {collapsed && (
                  <div
                    className={clsx(
                      "absolute left-full ml-3 z-50 hidden group-hover:flex",
                      "items-center px-2 py-1 rounded",
                      "bg-[#1a1a1a] border border-[#2a2a2a]",
                      "text-xs font-mono text-gray-200 whitespace-nowrap",
                      "shadow-lg pointer-events-none"
                    )}
                  >
                    {cat.name}
                    <span className="ml-2 text-gray-600">{cat.toolCount}</span>
                  </div>
                )}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
