"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        "flex gap-1 p-1 rounded-xl brushed-metal border border-obsidian-600",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            activeTab === tab.id
              ? "text-platinum-100"
              : "text-platinum-400 hover:text-platinum-200"
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-obsidian-700 rounded-lg shadow-lg"
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  "px-1.5 py-0.5 text-xs rounded-full",
                  activeTab === tab.id
                    ? "bg-sapphire-500/20 text-sapphire-300"
                    : "bg-obsidian-600 text-platinum-500"
                )}
              >
                {tab.count}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}
