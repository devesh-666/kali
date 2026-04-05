"use client"

import React, { useState } from "react"
import { ChevronDown } from "lucide-react"
import { clsx } from "clsx"
import CodeBlock from "@/components/ui/CodeBlock"

interface CommandFlag {
  flag: string
  description: string
}

interface Command {
  title: string
  syntax: string
  description: string
  example?: string
  flags?: CommandFlag[]
}

interface CommandBlockProps {
  command: Command
}

export default function CommandBlock({ command }: CommandBlockProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={clsx(
        "rounded-lg border overflow-hidden",
        "border-[#1a1a1a] dark:border-[#1a1a1a]",
        "bg-[#111111] dark:bg-[#111111]",
        "transition-colors duration-150",
        expanded ? "border-green-500/30" : "hover:border-[#2a2a2a]"
      )}
    >
      {/* Accordion header */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className={clsx(
          "w-full flex items-center justify-between gap-4 px-5 py-4",
          "text-left transition-colors duration-150",
          "hover:bg-[#161616] focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/40",
          "group"
        )}
        aria-expanded={expanded}
      >
        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-2">
          {/* Title */}
          <span className="text-sm font-mono font-semibold text-gray-200 flex-shrink-0">
            {command.title}
          </span>

          {/* Syntax preview */}
          <span
            className={clsx(
              "text-xs font-mono text-green-500/70 truncate",
              "sm:border-l sm:border-[#2a2a2a] sm:pl-3"
            )}
          >
            {command.syntax}
          </span>
        </div>

        <ChevronDown
          size={16}
          className={clsx(
            "text-gray-600 flex-shrink-0 transition-transform duration-200",
            "group-hover:text-gray-400",
            expanded ? "rotate-180 text-green-500/60" : "rotate-0"
          )}
        />
      </button>

      {/* Expanded body */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-[#1a1a1a] space-y-4 pt-4">
          {/* Description */}
          <p className="text-sm text-gray-400 leading-relaxed">{command.description}</p>

          {/* Syntax code block */}
          <div>
            <p className="text-xs font-mono text-gray-600 uppercase tracking-wider mb-2">
              Syntax
            </p>
            <CodeBlock code={command.syntax} language="bash" showCopy />
          </div>

          {/* Example code block */}
          {command.example && (
            <div>
              <p className="text-xs font-mono text-gray-600 uppercase tracking-wider mb-2">
                Example
              </p>
              <CodeBlock code={command.example} language="bash" showCopy />
            </div>
          )}

          {/* Flags table */}
          {command.flags && command.flags.length > 0 && (
            <div>
              <p className="text-xs font-mono text-gray-600 uppercase tracking-wider mb-2">
                Flags
              </p>
              <div className="overflow-x-auto rounded-md border border-[#1a1a1a]">
                <table className="w-full text-sm font-mono">
                  <thead>
                    <tr className="border-b border-[#1a1a1a] bg-[#0d0d0d]">
                      <th className="text-left px-4 py-2.5 text-xs text-gray-500 uppercase tracking-wider w-1/3">
                        Flag
                      </th>
                      <th className="text-left px-4 py-2.5 text-xs text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {command.flags.map((f, i) => (
                      <tr
                        key={f.flag}
                        className={clsx(
                          "border-b border-[#1a1a1a] last:border-b-0",
                          i % 2 === 0 ? "bg-[#111111]" : "bg-[#0f0f0f]"
                        )}
                      >
                        <td className="px-4 py-2.5 text-green-400 whitespace-nowrap">
                          {f.flag}
                        </td>
                        <td className="px-4 py-2.5 text-gray-400">{f.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
