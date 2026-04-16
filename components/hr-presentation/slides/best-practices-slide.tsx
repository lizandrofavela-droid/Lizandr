"use client"

import { SectionHeader } from "../section-header"
import { PresenterAvatar } from "../presenter-avatar"
import { AnimatedBackground, FloatingElements } from "../animated-background"
import { CheckCircle2, Clock, Lock, FileText, Users, BookOpen, Lightbulb } from "lucide-react"

interface BestPracticesSlideProps {
  section: "payroll" | "talent" | "cb"
}

const payrollPractices = [
  {
    title: "Action Plan",
    description: "Meeting with the Legal & Transportation dept to review the follow-up on 'Adjustments' cases.",
    icon: FileText,
    color: "#3b82f6",
  },
  {
    title: "LOCK",
    description: "Review the possibility of blocking dates for entering transport cases in Doit (Lock)",
    icon: Lock,
    color: "#f59e0b",
  },
  {
    title: "Proportional Vacation Project",
    description: "40% completion on vacation proportional allocation system",
    icon: Clock,
    color: "#10b981",
    progress: 40,
  },
  {
    title: "Payroll Campaign",
    description: "Process reinforcement across all departments",
    icon: Users,
    color: "#8b5cf6",
  },
]

const talentPractices = [
  {
    title: "Onboarding Survey",
    description: "Implementation of new employee feedback system during first 90 days",
    icon: FileText,
    color: "#3b82f6",
  },
  {
    title: "Internal Promotion",
    description: "Enhanced internal mobility program with career path visibility",
    icon: Users,
    color: "#10b981",
  },
  {
    title: "Integration Manual",
    description: "Comprehensive onboarding documentation for all new hires",
    icon: BookOpen,
    color: "#8b5cf6",
  },
]

const cbPractices = [
  {
    title: "Informational Session",
    description: "AON Broker meeting - Online & In-person sessions",
    icon: Users,
    color: "#3b82f6",
  },
  {
    title: "Minimum Wage Increase",
    description: "Implementation of new minimum wage adjustments (Pesos)",
    icon: FileText,
    color: "#10b981",
  },
]

export function BestPracticesSlide({ section }: BestPracticesSlideProps) {
  const practices = section === "payroll" ? payrollPractices : section === "talent" ? talentPractices : cbPractices
  const presenter = section === "payroll" 
    ? { name: "Rosa Villas", role: "Payroll", initials: "RV", color: "#10b981" }
    : section === "talent"
    ? { name: "Myriam Garcia", role: "Talent Acquisition", initials: "MG", color: "#3b82f6" }
    : { name: "Brisa Chaparro", role: "C&B / Migration", initials: "BC", color: "#8b5cf6" }

  return (
    <div className="min-h-screen px-6 py-12 relative">
      <AnimatedBackground 
        imageSrc="/images/bg-best-practices.jpg" 
        variant="particles"
      />
      <FloatingElements />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className="flex-1">
            <SectionHeader
              title="Best Practices / Key Activities"
              subtitle={`${section === "payroll" ? "Payroll" : section === "talent" ? "Talent Acquisition" : "C&B"} Initiatives`}
              presenter={presenter.name}
              quarter="Q1 - 2026"
            />
          </div>
          <PresenterAvatar
            name={presenter.name}
            role={presenter.role}
            initials={presenter.initials}
            color={presenter.color}
            isActive
            className="lg:w-auto"
          />
        </div>

        {/* Practices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {practices.map((practice, index) => (
            <div
              key={practice.title}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${practice.color}15` }}
                >
                  <practice.icon className="w-6 h-6" style={{ color: practice.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                      {index + 1}
                    </span>
                    <h3 className="font-semibold text-foreground">{practice.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {practice.description}
                  </p>
                  {"progress" in practice && practice.progress && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">{practice.progress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${practice.progress}%`,
                            backgroundColor: practice.color,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Key Insights</h3>
              <p className="text-sm text-muted-foreground">Focus areas for Q2 2026</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">Continue process optimization</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">Enhance digital transformation</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">Strengthen team collaboration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
