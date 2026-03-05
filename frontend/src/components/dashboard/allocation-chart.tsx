"use client";

import React from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency, cn } from "@/lib/utils";
import { mockAllocations, Allocation } from "@/lib/mock-data";

interface AllocationChartProps {
  className?: string;
}

export function AllocationChart({ className }: AllocationChartProps) {
  const data = mockAllocations;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload as Allocation;
      return (
        <div className="bg-obsidian-800 border border-obsidian-600 rounded-lg p-3 shadow-xl">
          <p className="text-sm text-platinum-200 font-medium">{item.category.replace("_", " ")}</p>
          <p className="text-lg font-mono text-platinum-100">{formatCurrency(item.value)}</p>
          <p className="text-xs text-platinum-400">{item.percentage.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn("relative rounded-2xl overflow-hidden", className)}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-obsidian-800 via-obsidian-800 to-obsidian-900" />
      
      {/* Glass bezel effect */}
      <div className="absolute inset-0 border border-obsidian-600/50 rounded-2xl" />
      <div className="absolute inset-1 border border-obsidian-700/30 rounded-2xl" />

      <div className="relative p-6">
        <h3 className="text-lg font-semibold text-platinum-100 mb-4">Asset Allocation</h3>

        <div className="flex items-center gap-6">
          {/* Donut Chart */}
          <div className="relative w-48 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1000}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-platinum-400 uppercase tracking-wider">Total</span>
              <span className="text-xl font-mono text-platinum-100">
                {formatCurrency(data.reduce((acc, item) => acc + item.value, 0), "INR", true)}
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-2">
            {data.map((item, i) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-sm" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-platinum-300 capitalize">
                    {item.category.replace("_", " ")}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono text-platinum-200">
                    {item.percentage.toFixed(1)}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
