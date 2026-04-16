"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface HologramIntroProps {
  onComplete: () => void
  onNavigateToSlide?: (slideIndex: number) => void
}

type PanelId = "payroll" | "cb" | "talent" | "comm" | "sgmm" | "budget"

const panelToSlideMap: Record<PanelId, number> = {
  payroll: 3,
  cb: 1,
  talent: 5,
  comm: 0, // Goes to welcome as there's no dedicated comm slide
  sgmm: 2,
  budget: 7,
}

export function HologramIntro({ onComplete, onNavigateToSlide }: HologramIntroProps) {
  const [hoveredPanel, setHoveredPanel] = useState<string | null>(null)
  const [phase, setPhase] = useState<"boot" | "scan" | "avatar" | "dashboard" | "complete">("boot")
  const [scanProgress, setScanProgress] = useState(0)
  const [dashboardItems, setDashboardItems] = useState<number[]>([])

  useEffect(() => {
    // Boot phase
    const bootTimer = setTimeout(() => setPhase("scan"), 800)
    return () => clearTimeout(bootTimer)
  }, [])

  useEffect(() => {
    if (phase === "scan") {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setPhase("avatar")
            return 100
          }
          return prev + 2
        })
      }, 30)
      return () => clearInterval(interval)
    }
  }, [phase])

  useEffect(() => {
    if (phase === "avatar") {
      const timer = setTimeout(() => setPhase("dashboard"), 2000)
      return () => clearTimeout(timer)
    }
  }, [phase])

  useEffect(() => {
    if (phase === "dashboard") {
      // Animate dashboard items appearing
      const items = [1, 2, 3, 4, 5, 6]
      items.forEach((item, index) => {
        setTimeout(() => {
          setDashboardItems((prev) => [...prev, item])
        }, index * 200)
      })
      
      const completeTimer = setTimeout(() => {
        setPhase("complete")
        setTimeout(onComplete, 800)
      }, 2500)
      return () => clearTimeout(completeTimer)
    }
  }, [phase, onComplete])

  return (
    <div className="fixed inset-0 bg-[#050508] z-50 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

      {/* Scanning lines */}
      {phase === "scan" && (
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80"
            style={{
              top: `${scanProgress}%`,
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.4)'
            }}
          />
        </div>
      )}

      {/* Boot sequence */}
      {phase === "boot" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center animate-pulse">
            <div className="text-cyan-400 font-mono text-sm tracking-widest mb-4">INITIALIZING SYSTEM</div>
            <div className="flex gap-1 justify-center">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i}
                  className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scan progress */}
      {phase === "scan" && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <div className="text-center">
            <div className="text-cyan-400 font-mono text-xs tracking-widest mb-2">AUTHENTICATING USER</div>
            <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-100"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
            <div className="text-cyan-400 font-mono text-xs mt-2">{scanProgress}%</div>
          </div>
        </div>
      )}

      {/* Avatar hologram */}
      {(phase === "avatar" || phase === "dashboard" || phase === "complete") && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`relative transition-all duration-1000 ${phase === "complete" ? "scale-150 opacity-0" : "scale-100 opacity-100"}`}>
            {/* Hologram base ring */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-80 h-20 rounded-full bg-cyan-500/10 blur-xl animate-pulse" />
            
            {/* Rotating rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-[400px] h-[400px] border border-cyan-500/30 rounded-full animate-spin-slow" />
              <div className="absolute w-[350px] h-[350px] border border-blue-500/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
              <div className="absolute w-[450px] h-[450px] border-2 border-dashed border-cyan-500/20 rounded-full animate-spin-slow" style={{ animationDuration: '40s' }} />
            </div>

            {/* Avatar container with hologram effect */}
            <div className="relative z-10">
              {/* Hologram flicker effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent mix-blend-overlay animate-flicker" />
              
              {/* Scan lines overlay */}
              <div 
                className="absolute inset-0 pointer-events-none z-20 opacity-30"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.1) 2px, rgba(34, 211, 238, 0.1) 4px)'
                }}
              />

              {/* Avatar image with hologram glow */}
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400/20 blur-3xl rounded-full" />
                <Image
                  src="/images/presenter-avatar.png"
                  alt="Presenter"
                  width={350}
                  height={450}
                  className="relative z-10 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                  style={{
                    filter: 'brightness(1.1) contrast(1.1)',
                    maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                  }}
                  priority
                />
                {/* Hologram color tint */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 via-transparent to-blue-500/20 mix-blend-overlay z-20" />
              </div>

              {/* Data readout near avatar */}
              <div className="absolute -right-32 top-1/4 text-left animate-fade-in-up">
                <div className="text-cyan-400 font-mono text-xs">ID: HR-DIRECTOR</div>
                <div className="text-cyan-300 font-mono text-xs mt-1">STATUS: VERIFIED</div>
                <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent mt-2" />
              </div>

              <div className="absolute -left-28 top-1/3 text-right animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="text-blue-400 font-mono text-xs">DEPT: CENTRAL HR</div>
                <div className="text-blue-300 font-mono text-xs mt-1">FOXCONN FSJ</div>
                <div className="w-20 h-0.5 bg-gradient-to-l from-blue-400 to-transparent mt-2 ml-auto" />
              </div>
            </div>

            {/* Name and title */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center">
              <div className="text-2xl font-bold text-white tracking-wider animate-fade-in-up">CENTRAL HR</div>
              <div className="text-cyan-400 font-mono text-sm tracking-widest mt-1 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>KPI DASHBOARD Q1-2026</div>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard panels appearing */}
      {(phase === "dashboard" || phase === "complete") && (
        <>
          {/* Top left panel */}
          {dashboardItems.includes(1) && (
            <div className="absolute top-8 left-8 animate-slide-in-left">
              <DashboardPanel title="PAYROLL" value="99%" color="cyan" />
            </div>
          )}
          
          {/* Top right panel */}
          {dashboardItems.includes(2) && (
            <div className="absolute top-8 right-8 animate-slide-in-right">
              <DashboardPanel title="C&B" value="94%" color="blue" />
            </div>
          )}

          {/* Middle left */}
          {dashboardItems.includes(3) && (
            <div className="absolute top-1/3 left-8 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
              <DashboardPanel title="TALENT" value="92%" color="purple" />
            </div>
          )}

          {/* Middle right */}
          {dashboardItems.includes(4) && (
            <div className="absolute top-1/3 right-8 animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
              <DashboardPanel title="COMM" value="71%" color="green" />
            </div>
          )}

          {/* Bottom left */}
          {dashboardItems.includes(5) && (
            <div className="absolute bottom-24 left-8 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              <DashboardPanel title="SGMM" value="78%" color="teal" />
            </div>
          )}

          {/* Bottom right */}
          {dashboardItems.includes(6) && (
            <div className="absolute bottom-24 right-8 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <DashboardPanel title="BUDGET" value="19.5%" color="amber" />
            </div>
          )}
        </>
      )}

      {/* Decorative corner elements */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-cyan-500/50" />
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-cyan-500/50" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-cyan-500/50" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-cyan-500/50" />

      {/* System info */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <div className="text-cyan-500/50 font-mono text-xs tracking-widest">
          FOXCONN FSJ HR DASHBOARD v2.0
        </div>
      </div>
    </div>
  )
}

function DashboardPanel({ title, value, color }: { title: string; value: string; color: string }) {
  const colorClasses: Record<string, string> = {
    cyan: "border-cyan-500/50 text-cyan-400 shadow-cyan-500/20",
    blue: "border-blue-500/50 text-blue-400 shadow-blue-500/20",
    purple: "border-purple-500/50 text-purple-400 shadow-purple-500/20",
    green: "border-emerald-500/50 text-emerald-400 shadow-emerald-500/20",
    teal: "border-teal-500/50 text-teal-400 shadow-teal-500/20",
    amber: "border-amber-500/50 text-amber-400 shadow-amber-500/20",
  }

  return (
    <div className={`glass border ${colorClasses[color]} rounded-lg p-4 min-w-[140px] shadow-lg`}>
      <div className="text-xs font-mono tracking-wider text-gray-400 mb-1">{title}</div>
      <div className={`text-2xl font-bold ${colorClasses[color].split(" ")[1]}`}>{value}</div>
      <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full bg-gradient-to-r ${
            color === "cyan" ? "from-cyan-500 to-cyan-400" :
            color === "blue" ? "from-blue-500 to-blue-400" :
            color === "purple" ? "from-purple-500 to-purple-400" :
            color === "green" ? "from-emerald-500 to-emerald-400" :
            color === "teal" ? "from-teal-500 to-teal-400" :
            "from-amber-500 to-amber-400"
          }`}
          style={{ width: value }}
        />
      </div>
    </div>
  )
}
