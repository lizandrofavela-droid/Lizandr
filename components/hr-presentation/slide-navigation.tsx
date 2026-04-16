"use client"

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SlideNavigationProps {
  currentSlide: number
  totalSlides: number
  onPrevious: () => void
  onNext: () => void
  onGoHome: () => void
  className?: string
}

export function SlideNavigation({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onGoHome,
  className,
}: SlideNavigationProps) {
  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-card/80 backdrop-blur-md border border-border rounded-full px-4 py-2 shadow-lg z-50",
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onGoHome}
        className="rounded-full hover:bg-primary/10 hover:text-primary"
      >
        <Home className="w-4 h-4" />
      </Button>
      
      <div className="w-px h-6 bg-border mx-1" />
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevious}
        disabled={currentSlide === 0}
        className="rounded-full hover:bg-primary/10 hover:text-primary disabled:opacity-30"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      
      <div className="flex items-center gap-1.5 px-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              i === currentSlide
                ? "w-6 bg-primary"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
          />
        ))}
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
        className="rounded-full hover:bg-primary/10 hover:text-primary disabled:opacity-30"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
      
      <div className="w-px h-6 bg-border mx-1" />
      
      <span className="text-xs text-muted-foreground font-mono">
        {currentSlide + 1} / {totalSlides}
      </span>
    </div>
  )
}
