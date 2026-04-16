"use client"

import { SectionHeader } from "../section-header"
import { KPICard } from "../kpi-card"
import { MonthlyBarChart, HorizontalBarChart } from "../charts"
import { PresenterAvatar } from "../presenter-avatar"
import { AnimatedCounter } from "../animated-counter"
import { ProgressRing } from "../progress-ring"
import { AnimatedBackground, FloatingElements } from "../animated-background"
import { Users, Briefcase, Star, Clock } from "lucide-react"

const plantHiringData = [
  { name: "Automation", value: 4, color: "#3b82f6" },
  { name: "Campus", value: 9, color: "#8b5cf6" },
  { name: "Group G", value: 3, color: "#10b981" },
  { name: "Hon Hai MX", value: 3, color: "#f59e0b" },
  { name: "JSD", value: 4, color: "#ec4899" },
  { name: "Rayprus", value: 3, color: "#06b6d4" },
  { name: "MMJ", value: 1, color: "#84cc16" },
]

const hiringStats = [
  { label: "Open Vacancies", value: 49, icon: Briefcase, color: "#3b82f6" },
  { label: "Positions Filled", value: 44, icon: Users, color: "#10b981" },
  { label: "Internal Promotions", value: 18, icon: Star, color: "#f59e0b" },
]

export function TalentSlide() {
  return (
    <div className="min-h-screen px-6 py-12 relative">
      <AnimatedBackground 
        imageSrc="/images/bg-talent.jpg" 
        variant="grid"
      />
      <FloatingElements />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className="flex-1">
            <SectionHeader
              title="Talent Acquisition"
              subtitle="Recruiting and Selection Process"
              presenter="Myriam Garcia"
              quarter="Q1 - 2026"
            />
          </div>
          <PresenterAvatar
            name="Myriam Garcia"
            role="Talent Acquisition"
            initials="MG"
            color="#3b82f6"
            isActive
            className="lg:w-auto"
          />
        </div>

        {/* Main KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Recruiting Automation"
            value={33}
            target={100}
            color="amber"
            delay={100}
          />
          <KPICard
            title="Time to Cover (Days)"
            value={34}
            target={30}
            unit=" days"
            color="amber"
            delay={200}
          />
          <KPICard
            title="Internal Talent Promotion"
            value={95}
            target={100}
            color="green"
            delay={300}
          />
          <KPICard
            title="90-Day Retention"
            value={92}
            target={100}
            color="green"
            delay={400}
          />
        </div>

        {/* Hiring Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {hiringStats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-6 flex items-center gap-4"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <AnimatedCounter
                  end={stat.value}
                  className="text-3xl font-bold text-foreground"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* By Plant */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Q1 2026 Detail — By Plant
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Class III Hiring Distribution
            </p>
            <MonthlyBarChart data={plantHiringData} height={250} />
            <div className="mt-4 text-center">
              <span className="text-sm text-muted-foreground">Total Filled: </span>
              <span className="text-lg font-bold text-foreground">44</span>
            </div>
          </div>

          {/* KPI Details */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              KPI Performance Details
            </h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <ProgressRing value={33} size={70} strokeWidth={6} color="#f59e0b">
                  <span className="text-sm font-bold text-foreground">33%</span>
                </ProgressRing>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">
                    Recruiting Automation (No paperwork)
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Target: 100% by Q3 2026
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <ProgressRing value={88} size={70} strokeWidth={6} color="#f59e0b">
                  <span className="text-sm font-bold text-foreground">88%</span>
                </ProgressRing>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">
                    Time to Cover C-III Positions
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Result: 34 Days (Target: {"<"}30 days)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <ProgressRing value={95} size={70} strokeWidth={6} color="#10b981">
                  <span className="text-sm font-bold text-foreground">95%</span>
                </ProgressRing>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">
                    Internal Talent Promotion
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Result: 23/25 (Target: {">"} 40% of vacancies)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <ProgressRing value={92} size={70} strokeWidth={6} color="#10b981">
                  <span className="text-sm font-bold text-foreground">92%</span>
                </ProgressRing>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">
                    90-Day Talent Retention
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Result: 18/19 retained
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
