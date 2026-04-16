"use client"

import { cn } from "@/lib/utils"
import { AnimatedCounter } from "./animated-counter"
import { ProgressRing } from "./progress-ring"

interface KPICardProps {
  title: string
  value: number
  target?: number
  unit?: string
  trend?: "up" | "down" | "neutral"
  color?: "green" | "blue" | "amber" | "red"
  className?: string
  showProgress?: boolean
  delay?: number
}

const colorMap = {
  green: "#10b981",
  blue: "#3b82f6",
  amber: "#f59e0b",
  red: "#ef4444",
}

export function KPICard({
  title,
  value,
  target = 100,
  unit = "%",
  color = "green",
  className,
  showProgress = true,
  delay = 0,
}: KPICardProps) {
  const percentage = Math.min((value / target) * 100, 100)
  const statusColor = value >= target * 0.9 ? "green" : value >= target * 0.7 ? "amber" : "red"

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl bg-card border border-border p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-muted-foreground mb-2 truncate">{title}</h3>
          <div className="flex items-baseline gap-1">
            <AnimatedCounter
              end={value}
              suffix={unit}
              decimals={unit === "%" ? 0 : 0}
              className="text-3xl font-bold text-foreground"
            />
            {target && (
              <span className="text-sm text-muted-foreground ml-2">/ {target}{unit}</span>
            )}
          </div>
        </div>
        
        {showProgress && (
          <ProgressRing
            value={percentage}
            size={80}
            strokeWidth={6}
            color={colorMap[statusColor]}
          >
            <span className="text-sm font-semibold text-foreground">
              {Math.round(percentage)}%
            </span>
          </ProgressRing>
        )}
      </div>
      
      <div className="mt-4 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: colorMap[statusColor],
          }}
        />
      </div>
    </div>
  )
}
