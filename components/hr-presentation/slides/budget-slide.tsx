"use client"

import { SectionHeader } from "../section-header"
import { DataTable } from "../data-table"
import { DonutChart, MonthlyBarChart } from "../charts"
import { PresenterAvatar } from "../presenter-avatar"
import { AnimatedCounter } from "../animated-counter"
import { ProgressRing } from "../progress-ring"
import { AnimatedBackground, FloatingElements } from "../animated-background"
import { DollarSign, TrendingUp, PieChart } from "lucide-react"

const budgetData = [
  ["C&B", "5,533", "8,805", "159.14%"],
  ["Payroll", "0", "368", "368%"],
  ["Communication", "13,500", "1,082", "8.01%"],
  ["Events & Sports", "38,114", "13,497", "35.41%"],
  ["OD", "24,085", "21,030", "87.32%"],
  ["Labor", "33,547", "329", "0.98%"],
  ["Hiring C1C2", "6,823", "1,352", "19.82%"],
  ["Talent Acquisition", "35,320", "3,554", "10.06%"],
  ["Social Work", "7,222", "1,928", "26.70%"],
  ["Medical", "71,793", "8,860", "12.34%"],
  ["Migration", "7,778", "7,276", "93.55%"],
  ["Central", "7,604", "6,312", "83.01%"],
  ["Environmental", "155,242", "31,359", "20.20%"],
  ["Safety", "134,981", "0", "0.00%"],
]

const monthlyExpenses = [
  { name: "JAN", value: 5.7, color: "#3b82f6" },
  { name: "FEB", value: 10.4, color: "#8b5cf6" },
  { name: "MAR", value: 19.5, color: "#10b981" },
]

const expenseDistribution = [
  { name: "Environmental", value: 31359, color: "#10b981" },
  { name: "OD", value: 21030, color: "#3b82f6" },
  { name: "Events", value: 13497, color: "#f59e0b" },
  { name: "Medical", value: 8860, color: "#ec4899" },
  { name: "C&B", value: 8805, color: "#8b5cf6" },
  { name: "Others", value: 22201, color: "#64748b" },
]

export function BudgetSlide() {
  return (
    <div className="min-h-screen px-6 py-12 relative">
      <AnimatedBackground 
        imageSrc="/images/bg-budget.jpg" 
        variant="waves"
      />
      <FloatingElements />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className="flex-1">
            <SectionHeader
              title="Budget HR — Q1-2026"
              subtitle="Expenses vs Budget Analysis"
              presenter="Andrea Cardona"
              quarter="Q1 - 2026"
            />
          </div>
          <PresenterAvatar
            name="Andrea Cardona"
            role="Comm. & Events"
            initials="AC"
            color="#f59e0b"
            isActive
            className="lg:w-auto"
          />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-sm text-muted-foreground">Annual Budget</div>
            </div>
            <AnimatedCounter
              end={541542}
              prefix="$"
              className="text-3xl font-bold text-foreground"
            />
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-sm text-muted-foreground">Q1 Expenses</div>
            </div>
            <AnimatedCounter
              end={105752}
              prefix="$"
              className="text-3xl font-bold text-foreground"
            />
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <PieChart className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-sm text-muted-foreground">Execution Rate</div>
            </div>
            <div className="flex items-center gap-4">
              <ProgressRing value={19.53} size={60} strokeWidth={6} color="#10b981">
                <span className="text-sm font-bold text-foreground">19.5%</span>
              </ProgressRing>
              <span className="text-3xl font-bold text-foreground">19.53%</span>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Monthly Expense Progress (%)
            </h3>
            <MonthlyBarChart data={monthlyExpenses} height={200} />
            <div className="flex items-center justify-center gap-8 mt-4">
              {monthlyExpenses.map((item) => (
                <div key={item.name} className="text-center">
                  <div className="text-xs text-muted-foreground">{item.name}</div>
                  <div className="text-lg font-bold" style={{ color: item.color }}>
                    {item.value}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Expense Distribution
            </h3>
            <DonutChart data={expenseDistribution} height={200} innerRadius={60} outerRadius={90} />
            <div className="grid grid-cols-3 gap-2 mt-4">
              {expenseDistribution.slice(0, 6).map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-muted-foreground truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Budget Table */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Detailed Budget Breakdown
          </h3>
          <DataTable
            headers={["Area", "Budget", "Real", "% Execution"]}
            rows={budgetData}
          />
          <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">Grand Total</span>
              <div className="flex items-center gap-8">
                <span className="text-muted-foreground">$541,542</span>
                <span className="text-muted-foreground">$105,752</span>
                <span className="font-bold text-primary">19.53%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
