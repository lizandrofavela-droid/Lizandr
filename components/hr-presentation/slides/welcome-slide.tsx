"use client"

import { useEffect, useState } from "react"
import { ProgressRing } from "../progress-ring"
import { AnimatedCounter } from "../animated-counter"
import { PresenterAvatar } from "../presenter-avatar"
import { AnimatedBackground, FloatingElements } from "../animated-background"
import { VideoBackground, DataStreams } from "../video-background"
import { ChevronRight } from "lucide-react"

const presenters = [
  { name: "Andrea Cardona", role: "Comm. & Events", initials: "AC", color: "#f59e0b", score: 71 },
  { name: "Brisa Chaparro", role: "C&B / Migration", initials: "BC", color: "#8b5cf6", score: 94 },
  { name: "Rosa Villas", role: "Payroll", initials: "RV", color: "#10b981", score: 99 },
  { name: "Myriam Garcia", role: "Talent Acquisition", initials: "MG", color: "#3b82f6", score: 92 },
]

interface WelcomeSlideProps {
  onNavigate: (section: string) => void
}

export function WelcomeSlide({ onNavigate }: WelcomeSlideProps) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Animated Background */}
      <AnimatedBackground 
        imageSrc="/images/bg-welcome.jpg" 
        variant="particles"
      />
      <VideoBackground variant="tech" />
      <DataStreams />
      <FloatingElements />
      
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        <div
          className={`text-center transition-all duration-1000 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Human Resources · Central KPI Results
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance">
            2026 Central HR KPI&apos;s
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-2">
            Q1 - 2026 · Foxconn FSJ - HR
          </p>
          
          <p className="text-muted-foreground mb-8">
            Manager SR - Human Resources: <span className="text-primary font-semibold">FIDEL CORRAL T</span>
          </p>
        </div>

        {/* KPI Overview Cards */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full transition-all duration-1000 delay-300 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {presenters.map((presenter, index) => (
            <button
              key={presenter.name}
              onClick={() => onNavigate(presenter.role.toLowerCase().replace(/[^a-z]/g, "-"))}
              className="group glass rounded-xl p-4 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 text-left animate-glow-pulse"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-center mb-3">
                <ProgressRing
                  value={presenter.score}
                  size={80}
                  strokeWidth={6}
                  color={presenter.color}
                >
                  <AnimatedCounter
                    end={presenter.score}
                    suffix="%"
                    className="text-lg font-bold text-foreground"
                  />
                </ProgressRing>
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1 truncate">{presenter.role}</h3>
              <p className="text-xs text-muted-foreground truncate">{presenter.name}</p>
              <div className="flex items-center gap-1 text-primary text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Ver detalles</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Presenters Section */}
      <div
        className={`border-t border-border bg-card/50 px-6 py-8 transition-all duration-1000 delay-500 relative z-10 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-lg font-semibold text-foreground mb-4 text-center">Presentadores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {presenters.map((presenter) => (
            <PresenterAvatar
              key={presenter.name}
              name={presenter.name}
              role={presenter.role}
              initials={presenter.initials}
              color={presenter.color}
              duration="15 min"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
