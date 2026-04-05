"use client"

import React, { ButtonHTMLAttributes } from "react"
import { Loader2 } from "lucide-react"
import { clsx } from "clsx"

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  children: React.ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "border border-green-500 text-green-500 bg-transparent",
    "hover:bg-green-500 hover:text-black",
    "dark:border-green-500 dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-black",
    "disabled:border-green-500/40 disabled:text-green-500/40 disabled:hover:bg-transparent disabled:hover:text-green-500/40",
  ].join(" "),
  secondary: [
    "border border-gray-600 text-gray-300 bg-transparent",
    "hover:bg-gray-800 hover:text-gray-100",
    "dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
    "light:border-gray-300 light:text-gray-700 light:hover:bg-gray-100",
    "disabled:border-gray-600/40 disabled:text-gray-600/40 disabled:hover:bg-transparent",
  ].join(" "),
  ghost: [
    "border border-transparent text-gray-400 bg-transparent",
    "hover:bg-gray-800/50 hover:text-gray-200",
    "dark:text-gray-400 dark:hover:bg-gray-800/50",
    "disabled:text-gray-600/40 disabled:hover:bg-transparent",
  ].join(" "),
  danger: [
    "border border-red-500 text-red-500 bg-transparent",
    "hover:bg-red-500 hover:text-white",
    "dark:border-red-500 dark:text-red-500 dark:hover:bg-red-500",
    "disabled:border-red-500/40 disabled:text-red-500/40 disabled:hover:bg-transparent disabled:hover:text-red-500/40",
  ].join(" "),
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded",
  md: "px-4 py-2 text-sm rounded-md",
  lg: "px-6 py-3 text-base rounded-lg",
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 font-mono font-medium",
        "transition-all duration-200 ease-in-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60 focus-visible:ring-offset-1 focus-visible:ring-offset-black",
        "cursor-pointer disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin" size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
