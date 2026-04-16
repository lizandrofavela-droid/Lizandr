"use client"

import { SectionHeader } from "../section-header"
import { KPICard } from "../kpi-card"
import { DataTable } from "../data-table"
import { MonthlyBarChart, HorizontalBarChart } from "../charts"
import { PresenterAvatar } from "../presenter-avatar"
import { AnimatedCounter } from "../animated-counter"
import { AnimatedBackground, FloatingElements } from "../animated-background"
import { TrendingDown, FileText, Database } from "lucide-react"

const incidencesData = [
  { name: "Q1-2024", value: 615, color: "#ef4444" },
  { name: "Q1-2025", value: 251, color: "#f59e0b" },
  { name: "Q1-2026", value: 267, color: "#10b981" },
]

const monthlyHiresData = [
  { name: "Jan", value: 52, color: "#3b82f6" },
  { name: "Feb", value: 135, color: "#3b82f6" },
  { name: "Mar", value: 80, color: "#3b82f6" },
]

const incidencesTableHeaders = ["BU", "JAN", "FEB", "MAR", "Total"]
const incidencesTableRows = [
  ["A1", "1", "0", "5", "6"],
  ["A2", "9", "13", "14", "36"],
  ["A3", "4", "18", "14", "36"],
  ["A5", "8", "23", "14", "45"],
  ["A6", "28", "79", "35", "138"],
  ["A7", "2", "2", "1", "5"],
  ["A10", "0", "0", "1", "1"],
  ["Total", "52", "135", "80", "267"],
]

export function PayrollSlide() {
  return (
    <div className="min-h-screen px-6 py-12 relative">
      <AnimatedBackground 
        imageSrc="/images/bg-payroll.jpg" 
        variant="particles"
      />
      <FloatingElements />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className="flex-1">
            <SectionHeader
              title="Payroll — KPIs"
              subtitle="General Average Payroll Incidences"
              presenter="Rosa Villas"
              quarter="Q1 - 2026"
            />
          </div>
          <PresenterAvatar
            name="Rosa Villas"
            role="Payroll"
            initials="RV"
            color="#10b981"
            isActive
            className="lg:w-auto"
          />
        </div>

        {/* Main KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KPICard
            title="General Average Payroll Incidences"
            value={90}
            target={100}
            color="green"
            delay={100}
          />
          <KPICard
            title="New Hires Files Completed"
            value={100}
            target={100}
            color="green"
            delay={200}
          />
          <KPICard
            title="Tress Database Updated"
            value={100}
            target={100}
            color="green"
            delay={300}
          />
        </div>

        {/* Charts and Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Incidences Trend */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Incidences Payroll Trend</h3>
                <p className="text-sm text-muted-foreground">Year over year comparison</p>
              </div>
            </div>
            <MonthlyBarChart data={incidencesData} height={200} />
            <div className="grid grid-cols-3 gap-4 mt-4">
              {incidencesData.map((item) => (
                <div key={item.name} className="text-center">
                  <div className="text-xs text-muted-foreground">{item.name}</div>
                  <div className="text-lg font-bold text-foreground">{item.value}</div>
                  <div
                    className="text-xs font-medium"
                    style={{ color: item.color }}
                  >
                    {item.name === "Q1-2026" ? "Current" : "Previous"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Hires */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Hires Files by Month</h3>
                <p className="text-sm text-muted-foreground">Q1 2026 hiring documentation</p>
              </div>
            </div>
            <MonthlyBarChart data={monthlyHiresData} height={200} />
            <div className="flex items-center justify-center gap-8 mt-4">
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Total Hires</div>
                <AnimatedCounter
                  end={267}
                  className="text-2xl font-bold text-foreground"
                />
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Completion Rate</div>
                <span className="text-2xl font-bold text-green-500">100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Incidences Table */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Database className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Incidences Payroll by BU</h3>
              <p className="text-sm text-muted-foreground">Detailed breakdown by business unit</p>
            </div>
          </div>
          <DataTable headers={incidencesTableHeaders} rows={incidencesTableRows} />
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Jan Rate</div>
              <div className="text-xl font-bold text-foreground mt-1">0.14%</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Feb Rate</div>
              <div className="text-xl font-bold text-foreground mt-1">0.38%</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Mar Rate</div>
              <div className="text-xl font-bold text-foreground mt-1">0.24%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
