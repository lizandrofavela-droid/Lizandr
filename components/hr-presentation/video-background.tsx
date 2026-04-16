"use client"

import { useEffect, useRef } from "react"

interface VideoBackgroundProps {
  children?: React.ReactNode
  variant?: "tech" | "corporate" | "abstract"
}

// Animated video-like background using CSS animations
export function VideoBackground({ children, variant = "tech" }: VideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create dynamic shimmer elements
    const createShimmer = () => {
      const shimmer = document.createElement("div")
      shimmer.className = "absolute pointer-events-none"
      shimmer.style.cssText = `
        width: ${Math.random() * 300 + 100}px;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
        top: ${Math.random() * 100}%;
        left: -20%;
        animation: slideAcross ${Math.random() * 3 + 4}s linear infinite;
        transform: rotate(${Math.random() * 30 - 15}deg);
      `
      container.appendChild(shimmer)
      
      setTimeout(() => shimmer.remove(), 7000)
    }

    const interval = setInterval(createShimmer, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Animated gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-gradient" />
      
      {/* Moving grid pattern */}
      {variant === "tech" && (
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-primary"
                />
              </pattern>
              <linearGradient id="gridFade" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="50%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" mask="url(#gridFade)" />
          </svg>
        </div>
      )}

      {/* Animated lines */}
      {variant === "corporate" && (
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
              style={{
                top: `${20 + i * 15}%`,
                left: "-100%",
                width: "200%",
                animation: `slideAcross ${8 + i * 2}s linear infinite`,
                animationDelay: `${i * 1.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Floating particles */}
      {variant === "abstract" && (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `floatParticle ${10 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Lens flare effect */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />

      {/* Scan line effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
      />

      {children}

      <style jsx>{`
        @keyframes slideAcross {
          0% {
            transform: translateX(-100%) rotate(var(--rotation, 0deg));
          }
          100% {
            transform: translateX(200%) rotate(var(--rotation, 0deg));
          }
        }
        @keyframes floatParticle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(20px, -30px) scale(1.5);
            opacity: 0.6;
          }
          50% {
            transform: translate(-10px, -50px) scale(1);
            opacity: 0.3;
          }
          75% {
            transform: translate(30px, -20px) scale(1.2);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  )
}

// Animated data streams effect
export function DataStreams() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute flex gap-4"
          style={{
            top: `${10 + i * 12}%`,
            left: "-10%",
            animation: `dataStream ${15 + i * 2}s linear infinite`,
            animationDelay: `${i * 2}s`,
          }}
        >
          {[...Array(10)].map((_, j) => (
            <div
              key={j}
              className="flex gap-1"
            >
              {[...Array(8)].map((_, k) => (
                <div
                  key={k}
                  className="w-2 h-4 rounded-sm"
                  style={{
                    backgroundColor: Math.random() > 0.7 
                      ? "rgba(59, 130, 246, 0.3)" 
                      : "rgba(59, 130, 246, 0.1)",
                    height: `${Math.random() * 12 + 4}px`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
      <style jsx>{`
        @keyframes dataStream {
          0% {
            transform: translateX(-10%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(110%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
