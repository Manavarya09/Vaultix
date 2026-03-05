"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Shield, 
  Building2, 
  Wallet 
} from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
import { assetCategories, AssetCategory } from "@/lib/utils";

interface InvestmentTabsProps {
  activeTab: string;
  onChange: (tabId: string) => void;
  counts: Record<AssetCategory, number>;
  className?: string;
}

const iconMap = {
  stocks: BarChart3,
  mutual_funds: PieChart,
  fo: TrendingUp,
  insurance: Shield,
  bank_deposits: Building2,
  other: Wallet,
};

export function InvestmentTabs({ activeTab, onChange, counts, className }: InvestmentTabsProps) {
  const tabs = assetCategories.map(cat => ({
    id: cat.id,
    label: cat.label,
    count: counts[cat.id as AssetCategory] || 0,
  }));

  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onChange={onChange}
      className={className}
    />
  );
}
