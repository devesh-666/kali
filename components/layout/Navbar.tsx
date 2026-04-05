"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Terminal, Menu, X } from "lucide-react"
import { clsx } from "clsx"
import ThemeToggle from "@/components/layout/ThemeToggle"

const navLinks = [
  { label: "Dashboard", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Categories", href: "/categories" },
  { label: "Search", href: "/search" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close mobile menu on route change (not tracked here, just close on link click)
  const closeMobile = () => setMobileOpen(false)

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 w-full",
        "bg-[#0a0a0a]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md",
        "border-b border-[#1a1a1a] dark:border-[#1a1a1a]"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-green-500 font-mono font-bold text-lg tracking-tight hover:text-green-400 transition-colors duration-150 flex-shrink-0"
        >
          <Terminal size={20} className="flex-shrink-0" />
          <span>KALI-LEARN</span>
        </Link>

        {/* Center nav links — desktop only */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "px-3 py-1.5 rounded text-sm font-mono",
                "text-gray-400 hover:text-gray-100",
                "hover:bg-gray-800/50",
                "transition-colors duration-150"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <ThemeToggle />

          {/* Hamburger — mobile only */}
          <button
            className={clsx(
              "md:hidden p-2 rounded text-gray-400 hover:text-gray-200",
              "hover:bg-gray-800/50 transition-colors duration-150",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50"
            )}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#1a1a1a] bg-[#0a0a0a] px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className={clsx(
                "px-3 py-2 rounded text-sm font-mono",
                "text-gray-400 hover:text-gray-100 hover:bg-gray-800/50",
                "transition-colors duration-150"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
