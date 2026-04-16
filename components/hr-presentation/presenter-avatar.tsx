"use client"

import { cn } from "@/lib/utils"

interface PresenterAvatarProps {
  name: string
  role: string
  initials: string
  duration?: string
  isActive?: boolean
  className?: string
  color?: string
}

export function PresenterAvatar({
  name,
  role,
  initials,
  duration = "15 min",
  isActive = false,
  className,
  color = "#3b82f6",
}: PresenterAvatarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
        isActive ? "bg-primary/10 border border-primary/30" : "bg-card border border-border hover:border-primary/30",
        className
      )}
    >
      <div className="relative">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-lg"
          style={{ backgroundColor: color }}
        >
          {initials}
        </div>
        {isActive && (
          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-foreground truncate">{name}</h4>
        <p className="text-sm text-muted-foreground truncate">{role}</p>
      </div>
      <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
        {duration}
      </div>
    </div>
  )
}
