"use client"

import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  quarter?: string
  presenter?: string
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  quarter = "Q1 - 2026",
  presenter,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      <div className="flex items-center gap-3 mb-2">
        <div className="h-1 w-12 rounded-full bg-primary" />
        <span className="text-sm font-medium text-primary uppercase tracking-wider">{quarter}</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-balance">{title}</h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground">{subtitle}</p>
      )}
      {presenter && (
        <p className="text-sm text-muted-foreground mt-2">
          Presenter: <span className="text-primary font-medium">{presenter}</span>
        </p>
      )}
    </div>
  )
}
