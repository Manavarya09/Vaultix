"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Settings, 
  Shield, 
  TrendingUp, 
  Building2, 
  Wallet,
  BarChart3,
  PieChart,
  Plus
} from "lucide-react";
import { 
  NetWorthCard, 
  AllocationChart, 
  InvestmentTabs, 
  HoldingsTable, 
  InsightSidebar, 
  StatementHistory 
} from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { AssetCategory, assetCategories } from "@/lib/utils";
import { 
  mockHoldingsByCategory, 
  mockInsights, 
  mockStatements,
  mockAllocations,
  Insight 
} from "@/lib/mock-data";

export default function DashboardPage() {
  const [activeCategory, setActiveCategory] = useState<AssetCategory>("stocks");
  const [insights, setInsights] = useState<Insight[]>(mockInsights);

  const counts: Record<AssetCategory, number> = {
    stocks: mockHoldingsByCategory.stocks.length,
    mutual_funds: mockHoldingsByCategory.mutual_funds.length,
    fo: mockHoldingsByCategory.fo.length,
    insurance: mockHoldingsByCategory.insurance.length,
    bank_deposits: mockHoldingsByCategory.bank_deposits.length,
    other: mockHoldingsByCategory.other.length,
  };

  const handleDismissInsight = (id: string) => {
    setInsights(prev => 
      prev.map(insight => 
        insight.id === id ? { ...insight, dismissed: true } : insight
      )
    );
  };

  const currentHoldings = mockHoldingsByCategory[activeCategory];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display text-platinum-100">Dashboard</h1>
          <p className="text-sm text-platinum-400 mt-1">
            Your complete investment portfolio at a glance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Link href="/admin">
            <Button variant="secondary" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Admin Panel
            </Button>
          </Link>
        </div>
      </div>

      {/* Net Worth Section */}
      <section>
        <NetWorthCard />
      </section>

      {/* Charts and Insights Row */}
      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AllocationChart />
        </div>
        <div className="lg:col-span-1">
          <InsightSidebar 
            insights={insights}
            activeCategory={activeCategory}
            onDismiss={handleDismissInsight}
            className="h-full min-h-[400px]"
          />
        </div>
      </section>

      {/* Investment Tabs */}
      <section>
        <InvestmentTabs 
          activeTab={activeCategory}
          onChange={(id) => setActiveCategory(id as AssetCategory)}
          counts={counts}
        />
      </section>

      {/* Holdings Table */}
      <section>
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {(() => {
                const icons: Record<AssetCategory, React.ReactNode> = {
                  stocks: <BarChart3 className="h-5 w-5 text-sapphire-400" />,
                  mutual_funds: <PieChart className="h-5 w-5 text-violet-400" />,
                  fo: <TrendingUp className="h-5 w-5 text-amber-400" />,
                  insurance: <Shield className="h-5 w-5 text-emerald-400" />,
                  bank_deposits: <Building2 className="h-5 w-5 text-indigo-400" />,
                  other: <Wallet className="h-5 w-5 text-platinum-400" />,
                };
                return icons[activeCategory];
              })()}
              <h2 className="text-lg font-semibold text-platinum-100 capitalize">
                {activeCategory.replace("_", " ")} Holdings
              </h2>
              <span className="text-sm text-platinum-500">
                ({currentHoldings.length} holdings)
              </span>
            </div>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Holding
            </Button>
          </div>
          
          <HoldingsTable holdings={currentHoldings} />
        </motion.div>
      </section>

      {/* Statement History */}
      <section>
        <StatementHistory statements={mockStatements} />
      </section>

      {/* Footer Note */}
      <div className="text-center py-4">
        <p className="text-xs text-platinum-500">
          Data refreshed just now • Next update in 45 seconds
        </p>
      </div>
    </div>
  );
}
