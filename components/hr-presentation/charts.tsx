"use client"

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
} from "recharts"

interface BarChartData {
  name: string
  value: number
  color?: string
}

interface MonthlyChartProps {
  data: BarChartData[]
  height?: number
  showGrid?: boolean
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-sm text-primary font-bold">{payload[0].value}</p>
      </div>
    )
  }
  return null
}

export function MonthlyBarChart({ data, height = 200, showGrid = false }: MonthlyChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />}
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#94a3b8", fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#94a3b8", fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(59, 130, 246, 0.1)" }} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || "#3b82f6"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

interface LineChartData {
  name: string
  value: number
}

interface TrendLineChartProps {
  data: LineChartData[]
  height?: number
  color?: string
}

export function TrendLineChart({ data, height = 200, color = "#10b981" }: TrendLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#94a3b8", fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#94a3b8", fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={{ fill: color, strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: color }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

interface DonutChartProps {
  data: { name: string; value: number; color: string }[]
  height?: number
  innerRadius?: number
  outerRadius?: number
}

export function DonutChart({ data, height = 200, innerRadius = 50, outerRadius = 80 }: DonutChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload as { name: string; value: number }
              return (
                <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
                  <p className="text-sm font-medium text-foreground">{data.name}</p>
                  <p className="text-sm text-primary font-bold">{data.value}</p>
                </div>
              )
            }
            return null
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

interface HorizontalBarChartProps {
  data: { name: string; value: number; color?: string }[]
  height?: number
  maxValue?: number
}

export function HorizontalBarChart({ data, height = 300, maxValue }: HorizontalBarChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value))
  
  return (
    <div className="space-y-3" style={{ height }}>
      {data.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{item.name}</span>
            <span className="font-semibold text-foreground">{item.value}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${(item.value / max) * 100}%`,
                backgroundColor: item.color || "#3b82f6",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
