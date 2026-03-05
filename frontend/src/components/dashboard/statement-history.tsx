"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle2, Loader2, XCircle, Download, RefreshCw } from "lucide-react";
import { cn, formatDate, AssetCategory } from "@/lib/utils";
import { Statement } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

interface StatementHistoryProps {
  statements: Statement[];
  className?: string;
}

const statusConfig = {
  processed: {
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    label: "Processed",
  },
  processing: {
    icon: Loader2,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    label: "Processing",
  },
  pending: {
    icon: Loader2,
    color: "text-platinum-400",
    bg: "bg-platinum-500/10",
    label: "Pending",
  },
  failed: {
    icon: XCircle,
    color: "text-ruby-400",
    bg: "bg-ruby-500/10",
    label: "Failed",
  },
};

const categoryColors: Record<AssetCategory, string> = {
  stocks: "#3B82F6",
  mutual_funds: "#8B5CF6",
  fo: "#F59E0B",
  insurance: "#10B981",
  bank_deposits: "#6366F1",
  other: "#71717A",
};

export function StatementHistory({ statements, className }: StatementHistoryProps) {
  return (
    <div className={cn("rounded-2xl overflow-hidden", className)}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-obsidian-800 via-obsidian-800 to-obsidian-900" />
      <div className="absolute inset-0 glass-panel pointer-events-none" />

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-sapphire-400" />
            <h3 className="text-lg font-semibold text-platinum-100">Statement History</h3>
          </div>
          <Badge variant="default">
            {statements.length} statements
          </Badge>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 top-2 bottom-2 w-px bg-obsidian-600" />

          <div className="space-y-4">
            {statements.map((statement, index) => {
              const status = statusConfig[statement.status];
              const StatusIcon = status.icon;
              const color = categoryColors[statement.assetCategory];

              return (
                <motion.div
                  key={statement.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative flex items-start gap-4 pl-8"
                >
                  {/* Timeline dot */}
                  <div 
                    className={cn(
                      "absolute left-0 w-6 h-6 rounded-full flex items-center justify-center z-10",
                      status.bg,
                      statement.status === "processing" && "animate-pulse"
                    )}
                  >
                    <StatusIcon className={cn("h-3 w-3", status.color)} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-3 rounded-lg bg-obsidian-800/50 hover:bg-obsidian-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <div>
                          <p className="text-sm font-medium text-platinum-100">
                            {statement.institution}
                          </p>
                          <p className="text-xs text-platinum-500">
                            {statement.accountType} • {statement.assetCategory.replace("_", " ")}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-platinum-400">
                          {formatDate(statement.statementDate)}
                        </span>
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 rounded hover:bg-obsidian-700 transition-colors text-platinum-400 hover:text-platinum-200">
                            <Download className="h-3.5 w-3.5" />
                          </button>
                          {statement.status === "failed" && (
                            <button className="p-1.5 rounded hover:bg-obsidian-700 transition-colors text-platinum-400 hover:text-platinum-200">
                              <RefreshCw className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-sapphire-500/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
