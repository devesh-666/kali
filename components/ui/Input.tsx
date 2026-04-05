"use client"

import React, { InputHTMLAttributes, ReactNode } from "react"
import { clsx } from "clsx"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: ReactNode
}

export default function Input({
  label,
  error,
  icon,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined)

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-mono text-gray-300 dark:text-gray-300 light:text-gray-700"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3 text-gray-500 dark:text-gray-500 pointer-events-none flex items-center">
            {icon}
          </span>
        )}

        <input
          id={inputId}
          className={clsx(
            "w-full rounded-md px-3 py-2 text-sm font-mono",
            "bg-[#111111] dark:bg-[#111111]",
            "text-gray-100 dark:text-gray-100",
            "placeholder:text-gray-600 dark:placeholder:text-gray-600",
            "border transition-colors duration-200",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
              : "border-gray-700 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-500 focus:ring-2 focus:ring-green-500/20",
            "outline-none",
            icon ? "pl-10" : "",
            className
          )}
          {...props}
        />
      </div>

      {error && (
        <p className="text-xs font-mono text-red-400 mt-0.5">{error}</p>
      )}
    </div>
  )
}
