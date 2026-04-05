import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ---------------------------------------------------------------------------
// Tailwind class merging
// ---------------------------------------------------------------------------
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// ---------------------------------------------------------------------------
// Slug conversion
// ---------------------------------------------------------------------------
export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// ---------------------------------------------------------------------------
// Text truncation
// ---------------------------------------------------------------------------
export function truncate(text: string, n: number): string {
  if (text.length <= n) return text
  return text.slice(0, n).trimEnd() + '…'
}

// ---------------------------------------------------------------------------
// Date formatting  →  "Jan 2024"
// ---------------------------------------------------------------------------
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

// ---------------------------------------------------------------------------
// Difficulty color
// ---------------------------------------------------------------------------
export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Beginner':
      return 'text-green-400'
    case 'Advanced':
      return 'text-red-400'
    case 'Intermediate':
    default:
      return 'text-yellow-400'
  }
}

// ---------------------------------------------------------------------------
// Category color  (deterministic hash → Tailwind colour)
// ---------------------------------------------------------------------------
const CATEGORY_COLORS = [
  'text-violet-400',
  'text-blue-400',
  'text-cyan-400',
  'text-teal-400',
  'text-emerald-400',
  'text-lime-400',
  'text-amber-400',
  'text-orange-400',
  'text-rose-400',
  'text-pink-400',
  'text-fuchsia-400',
  'text-indigo-400',
] as const

export function getCategoryColor(category: string): string {
  let hash = 0
  for (let i = 0; i < category.length; i++) {
    hash = (hash * 31 + category.charCodeAt(i)) >>> 0
  }
  return CATEGORY_COLORS[hash % CATEGORY_COLORS.length]
}

// ---------------------------------------------------------------------------
// Debounce
// ---------------------------------------------------------------------------
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): T {
  let timer: ReturnType<typeof setTimeout> | undefined

  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  } as T
}
