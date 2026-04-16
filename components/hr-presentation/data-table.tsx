"use client"

import { cn } from "@/lib/utils"

interface DataTableProps {
  headers: string[]
  rows: (string | number)[][]
  className?: string
  highlightLastColumn?: boolean
}

export function DataTable({
  headers,
  rows,
  className,
  highlightLastColumn = true,
}: DataTableProps) {
  return (
    <div className={cn("overflow-x-auto rounded-xl border border-border", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50 border-b border-border">
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left font-semibold text-foreground"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={cn(
                    "px-4 py-3",
                    highlightLastColumn && cellIndex === row.length - 1
                      ? "font-semibold text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
