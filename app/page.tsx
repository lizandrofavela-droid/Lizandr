"use client"

import { useState, useEffect, useCallback } from "react"
import { WelcomeSlide } from "@/components/hr-presentation/slides/welcome-slide"
import { CompensationSlide } from "@/components/hr-presentation/slides/compensation-slide"
import { SGMMSlide } from "@/components/hr-presentation/slides/sgmm-slide"
import { PayrollSlide } from "@/components/hr-presentation/slides/payroll-slide"
import { TalentSlide } from "@/components/hr-presentation/slides/talent-slide"
import { BudgetSlide } from "@/components/hr-presentation/slides/budget-slide"
import { BestPracticesSlide } from "@/components/hr-presentation/slides/best-practices-slide"
import { SlideNavigation } from "@/components/hr-presentation/slide-navigation"
import { HologramIntro } from "@/components/hr-presentation/hologram-intro"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

const slides = [
  { id: "welcome", name: "Inicio", component: WelcomeSlide },
  { id: "compensation", name: "C&B / Migration", component: CompensationSlide },
  { id: "sgmm", name: "SGMM", component: SGMMSlide },
  { id: "payroll", name: "Payroll", component: PayrollSlide },
  { id: "payroll-practices", name: "Payroll Best Practices", component: () => <BestPracticesSlide section="payroll" /> },
  { id: "talent", name: "Talent Acquisition", component: TalentSlide },
  { id: "talent-practices", name: "Talent Best Practices", component: () => <BestPracticesSlide section="talent" /> },
  { id: "budget", name: "Budget", component: BudgetSlide },
]

export default function HRPresentationPage() {
  const [showIntro, setShowIntro] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionDirection, setTransitionDirection] = useState<"left" | "right">("right")
  const [menuOpen, setMenuOpen] = useState(false)

  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide || isTransitioning) return
    setTransitionDirection(index > currentSlide ? "right" : "left")
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide(index)
      setIsTransitioning(false)
    }, 400)
  }, [currentSlide, isTransitioning])

  const handleNavigate = useCallback((section: string) => {
    const sectionMap: Record<string, number> = {
      "cb--migration": 1,
      "comm--events": 7,
      "payroll": 3,
      "talent-acquisition": 5,
    }
    const targetSlide = sectionMap[section] ?? 0
    goToSlide(targetSlide)
  }, [goToSlide])

  const handlePrevious = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1)
    }
  }, [currentSlide, goToSlide])

  const handleNext = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1)
    }
  }, [currentSlide, goToSlide])

  const handleGoHome = useCallback(() => {
    goToSlide(0)
  }, [goToSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        handleNext()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        handlePrevious()
      } else if (e.key === "Home") {
        e.preventDefault()
        handleGoHome()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleNext, handlePrevious, handleGoHome])

  const CurrentSlideComponent = slides[currentSlide].component

  // Show intro animation
  if (showIntro) {
    return <HologramIntro onComplete={() => setShowIntro(false)} />
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 md:px-6 h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">HR</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold text-foreground">Foxconn FSJ</h1>
              <p className="text-xs text-muted-foreground">HR Central KPIs Q1-2026</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-lg transition-all duration-200",
                  currentSlide === index
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {slide.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-card border-t border-border">
            <nav className="p-4 grid grid-cols-2 gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    goToSlide(index)
                    setMenuOpen(false)
                  }}
                  className={cn(
                    "px-3 py-2 text-sm rounded-lg text-left transition-all duration-200",
                    currentSlide === index
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {slide.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-24">
        <div
          className={cn(
            "transition-all duration-500 ease-out",
            isTransitioning 
              ? transitionDirection === "right" 
                ? "opacity-0 -translate-x-8 scale-98" 
                : "opacity-0 translate-x-8 scale-98"
              : "opacity-100 translate-x-0 scale-100"
          )}
        >
          {currentSlide === 0 ? (
            <WelcomeSlide onNavigate={handleNavigate} />
          ) : (
            <CurrentSlideComponent />
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onGoHome={handleGoHome}
      />

      {/* Keyboard Hints */}
      <div className="fixed bottom-6 right-6 hidden md:flex items-center gap-2 text-xs text-muted-foreground">
        <kbd className="px-2 py-1 bg-muted rounded text-foreground">←</kbd>
        <kbd className="px-2 py-1 bg-muted rounded text-foreground">→</kbd>
        <span>to navigate</span>
      </div>
    </div>
  )
}
