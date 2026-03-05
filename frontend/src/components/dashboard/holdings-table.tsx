"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, ChevronRight, MoreHorizontal } from "lucide-react";
import { formatCurrency, formatPercent, getChangeColor, cn } from "@/lib/utils";
import { Holding } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

interface HoldingsTableProps {
  holdings: Holding[];
  className?: string;
}

type SortField = "name" | "value" | "change" | "changePercent";
type SortOrder = "asc" | "desc";

export function HoldingsTable({ holdings, className }: HoldingsTableProps) {
  const [sortField, setSortField] = useState<SortField>("value");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const sortedHoldings = [...holdings].sort((a, b) => {
    const multiplier = sortOrder === "asc" ? 1 : -1;
    if (sortField === "name") {
      return multiplier * a.name.localeCompare(b.name);
    }
    return multiplier * (a[sortField] - b[sortField]);
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? (
      <ChevronUp className="h-3 w-3" />
    ) : (
      <ChevronDown className="h-3 w-3" />
    );
  };

  return (
    <div className={cn("rounded-xl border border-obsidian-700 overflow-hidden", className)}>
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-obsidian-800 border-b border-obsidian-700 text-xs uppercase tracking-wider text-platinum-400 font-medium">
        <div className="col-span-4">
          <button 
            onClick={() => handleSort("name")}
            className="flex items-center gap-1 hover:text-platinum-200 transition-colors"
          >
            Holding <SortIcon field="name" />
          </button>
        </div>
        <div className="col-span-2 text-right">Quantity</div>
        <div className="col-span-2 text-right">Price</div>
        <div className="col-span-2 text-right">
          <button 
            onClick={() => handleSort("value")}
            className="flex items-center gap-1 hover:text-platinum-200 transition-colors ml-auto"
          >
            Value <SortIcon field="value" />
          </button>
        </div>
        <div className="col-span-2 text-right">
          <button 
            onClick={() => handleSort("changePercent")}
            className="flex items-center gap-1 hover:text-platinum-200 transition-colors ml-auto"
          >
            Change <SortIcon field="changePercent" />
          </button>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-obsidian-800/50">
        {sortedHoldings.map((holding, index) => (
          <motion.div
            key={holding.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            {/* Main Row */}
            <div 
              className={cn(
                "grid grid-cols-12 gap-4 px-4 py-3 items-center cursor-pointer transition-colors",
                "hover:bg-obsidian-800/50",
                expandedId === holding.id && "bg-obsidian-800/30"
              )}
              onClick={() => setExpandedId(expandedId === holding.id ? null : holding.id)}
            >
              <div className="col-span-4 flex items-center gap-3">
                <button className="p-1 rounded hover:bg-obsidian-700 transition-colors">
                  <ChevronRight 
                    className={cn(
                      "h-4 w-4 text-platinum-500 transition-transform",
                      expandedId === holding.id && "rotate-90"
                    )} 
                  />
                </button>
                <div>
                  <p className="text-sm font-medium text-platinum-100">{holding.name}</p>
                  <p className="text-xs text-platinum-500">{holding.institution}</p>
                </div>
              </div>
              <div className="col-span-2 text-right">
                <span className="text-sm font-mono text-platinum-300">
                  {holding.quantity.toLocaleString()}
                </span>
              </div>
              <div className="col-span-2 text-right">
                <span className="text-sm font-mono text-platinum-300">
                  {formatCurrency(holding.price)}
                </span>
              </div>
              <div className="col-span-2 text-right">
                <span className="text-sm font-mono text-platinum-100">
                  {formatCurrency(holding.value)}
                </span>
              </div>
              <div className="col-span-2 text-right flex items-center justify-end gap-2">
                <span className={cn("text-sm font-mono", getChangeColor(holding.changePercent))}>
                  {formatPercent(holding.changePercent)}
                </span>
                <Badge variant={holding.changePercent >= 0 ? "success" : "danger"}>
                  {holding.change >= 0 ? "+" : ""}{formatCurrency(holding.change)}
                </Badge>
              </div>
            </div>

            {/* Expanded Row */}
            <AnimatePresence>
              {expandedId === holding.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 py-3 bg-obsidian-900/50 border-t border-obsidian-800/50">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-platinum-500 uppercase tracking-wider">Symbol</p>
                        <p className="text-sm text-platinum-300 font-mono">{holding.symbol || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-platinum-500 uppercase tracking-wider">Day Change</p>
                        <p className={cn("text-sm font-mono", getChangeColor(holding.change))}>
                          {formatCurrency(holding.change)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-platinum-500 uppercase tracking-wider">Action</p>
                        <button className="text-sm text-sapphire-400 hover:text-sapphire-300">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-obsidian-800 border-t border-obsidian-700">
        <div className="col-span-4">
          <span className="text-sm font-medium text-platinum-200">Total</span>
        </div>
        <div className="col-span-2 text-right">
          <span className="text-sm font-mono text-platinum-300">
            {holdings.reduce((acc, h) => acc + h.quantity, 0).toLocaleString()}
          </span>
        </div>
        <div className="col-span-2" />
        <div className="col-span-2 text-right">
          <span className="text-sm font-mono text-platinum-100">
            {formatCurrency(holdings.reduce((acc, h) => acc + h.value, 0))}
          </span>
        </div>
        <div className="col-span-2 text-right">
          <span className={cn(
            "text-sm font-mono",
            getChangeColor(holdings.reduce((acc, h) => acc + h.changePercent, 0) / holdings.length)
          )}>
            {formatPercent(holdings.reduce((acc, h) => acc + h.changePercent, 0) / holdings.length)}
          </span>
        </div>
      </div>
    </div>
  );
}
