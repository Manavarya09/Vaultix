"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, AlertCircle, Info, Sparkles } from "lucide-react";
import { cn, formatDate, AssetCategory } from "@/lib/utils";
import { Insight } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

interface InsightSidebarProps {
  insights: Insight[];
  activeCategory: AssetCategory | "all";
  onDismiss: (id: string) => void;
  className?: string;
}

const priorityConfig = {
  high: {
    icon: AlertTriangle,
    color: "text-ruby-400",
    bg: "bg-ruby-500/10",
    border: "border-ruby-500/20",
  },
  medium: {
    icon: AlertCircle,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  low: {
    icon: Info,
    color: "text-sapphire-400",
    bg: "bg-sapphire-500/10",
    border: "border-sapphire-500/20",
  },
};

export function InsightSidebar({ insights, activeCategory, onDismiss, className }: InsightSidebarProps) {
  const filteredInsights = insights.filter(
    insight => !insight.dismissed && (activeCategory === "all" || insight.category === activeCategory)
  );

  return (
    <div className={cn("rounded-2xl overflow-hidden", className)}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-800 via-obsidian-800 to-obsidian-900" />
      <div className="absolute inset-0 glass-panel pointer-events-none" />

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="h-5 w-5 text-amber-400" />
          <h3 className="text-lg font-semibold text-platinum-100">Insights</h3>
          <Badge variant="warning" className="ml-auto">
            {filteredInsights.length} new
          </Badge>
        </div>

        {/* Insights List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredInsights.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-obsidian-700 flex items-center justify-center">
                  <Info className="h-6 w-6 text-platinum-500" />
                </div>
                <p className="text-sm text-platinum-400">No insights for this category</p>
              </motion.div>
            ) : (
              filteredInsights.map((insight, index) => {
                const config = priorityConfig[insight.priority];
                const Icon = config.icon;

                return (
                  <motion.div
                    key={insight.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "relative p-4 rounded-xl border",
                      config.bg,
                      config.border
                    )}
                  >
                    {/* Priority indicator */}
                    <div className={cn(
                      "absolute left-0 top-0 bottom-0 w-1 rounded-l-xl",
                      insight.priority === "high" && "bg-ruby-500",
                      insight.priority === "medium" && "bg-amber-500",
                      insight.priority === "low" && "bg-sapphire-500"
                    )} />

                    <div className="flex items-start gap-3">
                      <Icon className={cn("h-5 w-5 mt-0.5", config.color)} />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-medium text-platinum-100">
                            {insight.title}
                          </h4>
                          <button
                            onClick={() => onDismiss(insight.id)}
                            className="p-1 rounded hover:bg-obsidian-700 transition-colors"
                          >
                            <X className="h-3 w-3 text-platinum-500" />
                          </button>
                        </div>
                        <p className="text-xs text-platinum-400 mt-1 line-clamp-2">
                          {insight.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={insight.priority === "high" ? "danger" : insight.priority === "medium" ? "warning" : "info"}>
                            {insight.priority}
                          </Badge>
                          <span className="text-xs text-platinum-500">
                            {formatDate(insight.createdAt, "relative")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
