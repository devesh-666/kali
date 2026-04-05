import React from "react"
import { clsx } from "clsx"

type BadgeVariant = "beginner" | "intermediate" | "advanced" | "category" | string

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<string, string> = {
  beginner:
    "text-green-400 bg-green-400/10 border-green-400/20",
  intermediate:
    "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  advanced:
    "text-red-400 bg-red-400/10 border-red-400/20",
  category:
    "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
}

const defaultVariant =
  "text-gray-400 bg-gray-400/10 border-gray-400/20"

export default function Badge({ variant = "category", children, className }: BadgeProps) {
  const classes = variantClasses[variant] ?? defaultVariant

  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-0.5",
        "text-xs font-mono font-medium",
        "rounded-full border",
        "whitespace-nowrap",
        classes,
        className
      )}
    >
      {children}
    </span>
  )
}
