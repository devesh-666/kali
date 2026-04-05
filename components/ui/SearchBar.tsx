"use client"

import React, { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { clsx } from "clsx"

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  initialValue?: string
}

export default function SearchBar({
  onSearch,
  placeholder = "Search tools, commands...",
  initialValue = "",
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue)
  const [isMac, setIsMac] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Detect platform for shortcut hint
  useEffect(() => {
    setIsMac(
      typeof navigator !== "undefined" &&
        /Mac|iPhone|iPod|iPad/.test(navigator.platform)
    )
  }, [])

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onSearch(value)
    }, 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [value, onSearch])

  const handleClear = () => {
    setValue("")
    onSearch("")
  }

  return (
    <div className="relative flex items-center w-full">
      {/* Search icon */}
      <span className="absolute left-3 text-gray-500 pointer-events-none flex items-center z-10">
        <Search size={16} />
      </span>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={clsx(
          "w-full pl-10 pr-20 py-2.5 text-sm font-mono",
          "bg-[#111111] dark:bg-[#111111]",
          "text-gray-100 dark:text-gray-100",
          "placeholder:text-gray-600 dark:placeholder:text-gray-600",
          "border border-gray-700 dark:border-gray-700 rounded-lg",
          "transition-colors duration-200",
          "focus:outline-none focus:border-green-500 dark:focus:border-green-500",
          "focus:ring-2 focus:ring-green-500/20"
        )}
      />

      <div className="absolute right-3 flex items-center gap-2">
        {/* Clear button */}
        {value && (
          <button
            onClick={handleClear}
            aria-label="Clear search"
            className="text-gray-500 hover:text-gray-300 transition-colors duration-150 focus:outline-none"
          >
            <X size={14} />
          </button>
        )}

        {/* Keyboard shortcut badge */}
        <kbd
          className={clsx(
            "hidden sm:inline-flex items-center px-1.5 py-0.5",
            "text-[10px] font-mono text-gray-600",
            "border border-gray-700 rounded",
            "bg-[#0a0a0a] dark:bg-[#0a0a0a]",
            "select-none pointer-events-none"
          )}
        >
          {isMac ? "⌘K" : "Ctrl+K"}
        </kbd>
      </div>
    </div>
  )
}
