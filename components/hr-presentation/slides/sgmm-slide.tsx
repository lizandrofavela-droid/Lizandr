"use client"

import { SectionHeader } from "../section-header"
import { KPICard } from "../kpi-card"
import { ProgressRing } from "../progress-ring"
import { AnimatedCounter } from "../animated-counter"
import { PresenterAvatar } from "../presenter-avatar"
import { MonthlyBarChart } from "../charts"
import { AnimatedBackground, FloatingElements } from "../animated-background"
import { Shield, BookOpen, CheckCircle2 } from "lucide-react"

const sessionData = [
  { name: "Jan", value: 100, color: "#10b981" },
  { name: "Feb", value: 100, color: "#10b981" },
  { name: "Mar", value: 100, color: "#10b981" },
]

export function SGMMSlide() {
  return (
    <div className="min-h-screen px-6 py-12 relative">
      <AnimatedBackground 
        imageSrc="/images/bg-sgmm.jpg" 
        variant="waves"
      />
      <FloatingElements />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className="flex-1">
            <SectionHeader
              title="SGMM - Medical Insurance"
              subtitle="Medical Sessions & Coverage Details"
              presenter="Brisa Chaparro"
              quarter="Q1 - 2026"
            />
          </div>
          <PresenterAvatar
            name="Brisa Chaparro"
            role="C&B / Migration"
            initials="BC"
            color="#8b5cf6"
            isActive
            className="lg:w-auto"
          />
        </div>

        {/* Main KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <KPICard
            title="Q-1 Sessions"
            value={100}
            target={100}
            color="green"
            delay={100}
          />
          <KPICard
            title="On time Medical/Life Insurance"
            value={100}
            target={100}
            color="green"
            delay={200}
          />
        </div>

        {/* Coverage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">On-site Coverage</h3>
                <p className="text-sm text-muted-foreground">Medical insurance reach</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <AnimatedCounter
                    end={333}
                    className="text-4xl font-bold text-foreground"
                  />
                  <span className="text-muted-foreground">/ 905 HC</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-2xl font-bold text-blue-500">37%</span>
                </div>
              </div>
              <ProgressRing
                value={37}
                size={100}
                strokeWidth={8}
                color="#3b82f6"
              >
                <span className="text-lg font-bold text-foreground">37%</span>
              </ProgressRing>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">e-Learning Coverage</h3>
                <p className="text-sm text-muted-foreground">Online training completion</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <AnimatedCounter
                    end={709}
                    className="text-4xl font-bold text-foreground"
                  />
                  <span className="text-muted-foreground">/ 905 HC</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-500">78%</span>
                </div>
              </div>
              <ProgressRing
                value={78}
                size={100}
                strokeWidth={8}
                color="#10b981"
              >
                <span className="text-lg font-bold text-foreground">78%</span>
              </ProgressRing>
            </div>
          </div>
        </div>

        {/* Sessions Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Medical Sessions by Month</h3>
            <MonthlyBarChart data={sessionData} height={200} />
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">INM Compliance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <span className="font-medium text-foreground">0 Delays</span>
                </div>
                <span className="text-green-500 font-bold">100%</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <span className="font-medium text-foreground">0 Inspection Findings</span>
                </div>
                <span className="text-green-500 font-bold">Compliant</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <span className="font-medium text-foreground">Process Time</span>
                </div>
                <span className="text-green-500 font-bold">{"<"}10 days</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="text-sm text-muted-foreground">Total Compliance</div>
              <div className="flex items-baseline justify-center gap-2 mt-1">
                <span className="text-3xl font-bold text-foreground">27</span>
                <span className="text-muted-foreground">/27</span>
                <span className="text-sm text-muted-foreground ml-2">|</span>
                <span className="text-3xl font-bold text-foreground ml-2">76</span>
                <span className="text-muted-foreground">/76</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
