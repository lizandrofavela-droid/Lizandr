"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

interface AnimatedBackgroundProps {
  imageSrc?: string
  variant?: "particles" | "waves" | "grid" | "gradient"
  overlay?: boolean
  children?: React.ReactNode
}

export function AnimatedBackground({
  imageSrc,
  variant = "particles",
  overlay = true,
  children
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initParticles = () => {
      particles = []
      const count = variant === "particles" ? 80 : variant === "grid" ? 50 : 30
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`
        ctx.fill()

        // Draw connections
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - dist / 120)})`
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(drawParticles)
    }

    const drawWaves = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const time = Date.now() * 0.001

      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height)

        for (let x = 0; x <= canvas.width; x += 10) {
          const y = canvas.height * 0.7 + 
            Math.sin(x * 0.01 + time + i) * 30 +
            Math.sin(x * 0.02 + time * 1.5 + i) * 20
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.closePath()
        ctx.fillStyle = `rgba(59, 130, 246, ${0.05 - i * 0.015})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(drawWaves)
    }

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const time = Date.now() * 0.001
      const gridSize = 50

      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)"
      ctx.lineWidth = 1

      for (let x = 0; x < canvas.width; x += gridSize) {
        const offset = Math.sin(time + x * 0.01) * 5
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x + offset, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        const offset = Math.sin(time + y * 0.01) * 5
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y + offset)
        ctx.stroke()
      }

      // Animated nodes at intersections
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const pulse = Math.sin(time * 2 + x * 0.02 + y * 0.02) * 0.5 + 0.5
          ctx.beginPath()
          ctx.arc(x, y, 2 + pulse * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(59, 130, 246, ${0.3 + pulse * 0.3})`
          ctx.fill()
        }
      }

      animationId = requestAnimationFrame(drawGrid)
    }

    resize()
    window.addEventListener("resize", resize)

    if (variant === "particles") {
      initParticles()
      drawParticles()
    } else if (variant === "waves") {
      drawWaves()
    } else if (variant === "grid") {
      drawGrid()
    }

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [variant])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background Image */}
      {imageSrc && (
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt="Background"
            fill
            className="object-cover opacity-30 scale-105 animate-slow-zoom"
            priority
          />
        </div>
      )}

      {/* Animated Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Gradient Overlay */}
      {variant === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 animate-gradient" />
      )}

      {/* Dark Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
      )}

      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      {children}
    </div>
  )
}

// Floating elements component
export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-slow-reverse" />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-chart-3/10 rounded-full blur-3xl animate-float-medium" />
      
      {/* Geometric shapes */}
      <div className="absolute top-32 right-1/4 w-20 h-20 border border-primary/20 rotate-45 animate-spin-slow" />
      <div className="absolute bottom-40 left-1/4 w-16 h-16 border border-accent/20 rounded-full animate-pulse-slow" />
    </div>
  )
}
