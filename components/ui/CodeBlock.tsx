"use client"

import React, { useState } from "react"
import { Copy, Check } from "lucide-react"
import { clsx } from "clsx"

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  showCopy?: boolean
}

export default function CodeBlock({
  code,
  language = "bash",
  title,
  showCopy = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback for environments without clipboard API
      const el = document.createElement("textarea")
      el.value = code
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="rounded-lg overflow-hidden border border-[#1a1a1a] font-mono text-sm">
      {/* Terminal top bar */}
      <div className="flex items-center bg-[#1a1a1a] px-4 py-2.5 gap-2">
        {/* Traffic-light dots */}
        <span className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0" />
        <span className="w-3 h-3 rounded-full bg-yellow-400 flex-shrink-0" />
        <span className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />

        {/* Title centered */}
        <div className="flex-1 flex justify-center">
          <span className="text-xs text-gray-400 truncate">
            {title ?? language}
          </span>
        </div>

        {/* Spacer to balance the dots */}
        <span className="w-[60px] flex-shrink-0" />
      </div>

      {/* Code area */}
      <div className="relative bg-[#0d0d0d]">
        {showCopy && (
          <button
            onClick={handleCopy}
            aria-label="Copy code"
            className={clsx(
              "absolute top-3 right-3 z-10",
              "flex items-center gap-1.5 px-2 py-1 rounded",
              "text-xs font-mono transition-all duration-200",
              copied
                ? "text-green-400 bg-green-400/10 border border-green-400/30"
                : "text-gray-500 bg-[#1a1a1a] border border-[#2a2a2a] hover:text-gray-300 hover:border-gray-600"
            )}
          >
            {copied ? (
              <>
                <Check size={12} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Copy</span>
              </>
            )}
          </button>
        )}

        <pre className="overflow-x-auto p-4 pr-24 text-green-400 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
