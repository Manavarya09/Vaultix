"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import { mockNetWorth } from "@/lib/mock-data";

interface NetWorthCardProps {
  className?: string;
}

export function NetWorthCard({ className }: NetWorthCardProps) {
  const { total, change, changeValue, history } = mockNetWorth;
  
  const maxValue = Math.max(...history.map(h => h.value));
  const minValue = Math.min(...history.map(h => h.value));
  const range = maxValue - minValue;

  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-obsidian-800 via-obsidian-800 to-obsidian-900" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      
      {/* Glass overlay */}
      <div className="absolute inset-0 glass-panel pointer-events-none" />
      
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-sapphire-400" />
            <span className="text-xs uppercase tracking-wider text-platinum-400">Total Net Worth</span>
          </div>
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
            change >= 0 
              ? "bg-emerald-500/10 text-emerald-400" 
              : "bg-ruby-500/10 text-ruby-400"
          )}>
            {change >= 0 ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{formatPercent(change)}</span>
          </div>
        </div>

        {/* Value Display */}
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="led-display inline-flex items-baseline px-4 py-2 rounded-xl"
          >
            <span className="text-4xl font-mono text-platinum-100 tracking-tight">
              {formatCurrency(total)}
            </span>
          </motion.div>
          <p className={cn(
            "text-sm mt-2 font-medium",
            change >= 0 ? "text-emerald-400" : "text-ruby-400"
          )}>
            {change >= 0 ? "+" : ""}{formatCurrency(changeValue)} this month
          </p>
        </div>

        {/* Mini Sparkline */}
        <div className="h-16 flex items-end gap-1">
          {history.map((item, i) => {
            const height = ((item.value - minValue) / range) * 100;
            return (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(height, 8)}%` }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  "flex-1 rounded-t",
                  i === history.length - 1 
                    ? "bg-gradient-to-t from-sapphire-500 to-sapphire-400" 
                    : "bg-obsidian-600"
                )}
              />
            );
          })}
        </div>

        {/* Glow effect */}
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-sapphire-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}
