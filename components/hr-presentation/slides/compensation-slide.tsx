"use client"

import { SectionHeader } from "../section-header"
import { KPICard } from "../kpi-card"
import { DataTable } from "../data-table"
import { MonthlyBarChart } from "../charts"
import { PresenterAvatar } from "../presenter-avatar"
import { AnimatedBackground, FloatingElements } from "../animated-background"
import { CheckCircle2 } from "lucide-react"

const salaryStructureData = [
  { name: "Jan", value: 89, color: "#3b82f6" },
  { name: "Feb", value: 89, color: "#3b82f6" },
  { name: "Mar", value: 89, color: "#3b82f6" },
]

const jobOfferData = [
  { name: "Jan", value: 86, color: "#f59e0b" },
  { name: "Feb", value: 85, color: "#f59e0b" },
  { name: "Mar", value: 100, color: "#10b981" },
]

const processTimeData = [
  { name: "Jan", value: 83, color: "#ef4444" },
  { name: "Feb", value: 100, color: "#10b981" },
  { name: "Mar", value: 100, color: "#10b981" },
]

const keyActivities = [
  "Auto Insurance Renewal – March 1st",
  "Profuturo Afore Informational Session",
  "UMA increase: $117.31 MN",
]

export function CompensationSlide() {
  return (
    <div className="min-h-screen px-6 py-12 relative">
      <AnimatedBackground 
        imageSrc="/images/bg-compensation.jpg" 
        variant="grid"
      />
      <FloatingElements />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className="flex-1">
            <SectionHeader
              title="Compensation & Benefits / Migration"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KPICard
            title="FSJ C-III Employees in Salary Structure"
            value={89}
            target={100}
            color="blue"
            delay={100}
          />
          <KPICard
            title="Job Offer Acceptance"
            value={90}
            target={100}
            color="amber"
            delay={200}
          />
          <KPICard
            title="Job offers & salary adj. form"
            value={94}
            target={100}
            color="green"
            delay={300}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Salary Structure by Month
            </h3>
            <MonthlyBarChart data={salaryStructureData} height={180} />
            <div className="mt-4 text-center">
              <span className="text-2xl font-bold text-foreground">804</span>
              <span className="text-muted-foreground">/905</span>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Job Offer Acceptance Rate
            </h3>
            <MonthlyBarChart data={jobOfferData} height={180} />
            <div className="mt-4 text-center">
              <span className="text-2xl font-bold text-foreground">47</span>
              <span className="text-muted-foreground">/53</span>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Process Time {"<"}5 Days
            </h3>
            <MonthlyBarChart data={processTimeData} height={180} />
            <div className="mt-4 text-center">
              <span className="text-2xl font-bold text-foreground">58</span>
              <span className="text-muted-foreground">/63</span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Key Requirements</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-muted-foreground">C3 acceptance rate {">"} 95%</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-muted-foreground">Job Position 100% Aligned</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-muted-foreground">Process Time {"<"}5 Days</span>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Q-1 Key Activities</h3>
            <div className="space-y-3">
              {keyActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
