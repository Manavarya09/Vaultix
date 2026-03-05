"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Users, 
  BarChart3, 
  MessageSquare,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Send,
  AlertTriangle,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatDate, AssetCategory, assetCategories } from "@/lib/utils";
import { mockHoldingsByCategory, mockAllocations } from "@/lib/mock-data";

interface User {
  id: string;
  name: string;
  email: string;
  connectedAccounts: number;
  totalValue: number;
  lastActive: string;
  status: "active" | "pending" | "error";
}

const mockUsers: User[] = [
  { id: "1", name: "Amit Sharma", email: "amit.sharma@email.com", connectedAccounts: 3, totalValue: 248532150, lastActive: "2026-03-05", status: "active" },
  { id: "2", name: "Priya Patel", email: "priya.patel@email.com", connectedAccounts: 2, totalValue: 185000000, lastActive: "2026-03-04", status: "active" },
  { id: "3", name: "Rahul Verma", email: "rahul.verma@email.com", connectedAccounts: 1, totalValue: 95000000, lastActive: "2026-03-03", status: "pending" },
  { id: "4", name: "Sneha Gupta", email: "sneha.gupta@email.com", connectedAccounts: 4, totalValue: 520000000, lastActive: "2026-03-05", status: "active" },
  { id: "5", name: "Vikram Singh", email: "vikram.singh@email.com", connectedAccounts: 2, totalValue: 72000000, lastActive: "2026-02-28", status: "error" },
];

const statusConfig = {
  active: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  pending: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10" },
  error: { icon: XCircle, color: "text-ruby-400", bg: "bg-ruby-500/10" },
};

export default function AdminPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(mockUsers[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [insightTitle, setInsightTitle] = useState("");
  const [insightDescription, setInsightDescription] = useState("");
  const [insightPriority, setInsightPriority] = useState<"high" | "medium" | "low">("medium");
  const [insightCategory, setInsightCategory] = useState<AssetCategory>("stocks");

  const filteredUsers = mockUsers.filter(
    user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display text-platinum-100">Admin Panel</h1>
          <p className="text-sm text-platinum-400 mt-1">
            Manage users, view portfolios, and push insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: "1,247", icon: Users, color: "sapphire" },
          { label: "Active Today", value: "342", icon: BarChart3, color: "emerald" },
          { label: "Statements Processed", value: "12.5K", icon: CheckCircle2, color: "amber" },
          { label: "Insights Pushed", value: "847", icon: MessageSquare, color: "violet" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card variant="glass" className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-platinum-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-mono text-platinum-100 mt-1">{stat.value}</p>
                </div>
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center
                  ${stat.color === 'sapphire' ? 'bg-sapphire-500/20' : ''}
                  ${stat.color === 'emerald' ? 'bg-emerald-500/20' : ''}
                  ${stat.color === 'amber' ? 'bg-amber-500/20' : ''}
                  ${stat.color === 'violet' ? 'bg-violet-500/20' : ''}
                `}>
                  <stat.icon className={`
                    h-5 w-5
                    ${stat.color === 'sapphire' ? 'text-sapphire-400' : ''}
                    ${stat.color === 'emerald' ? 'text-emerald-400' : ''}
                    ${stat.color === 'amber' ? 'text-amber-400' : ''}
                    ${stat.color === 'violet' ? 'text-violet-400' : ''}
                  `} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* User List */}
        <div className="lg:col-span-1">
          <Card variant="glass" className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-platinum-100">Users</h2>
              <Badge>{filteredUsers.length}</Badge>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-platinum-500" />
              <input 
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 bg-obsidian-800 border border-obsidian-600 rounded-lg text-platinum-100 placeholder:text-platinum-500 focus:outline-none focus:border-sapphire-500"
              />
            </div>

            {/* User List */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredUsers.map((user, i) => {
                const status = statusConfig[user.status];
                const StatusIcon = status.icon;
                
                return (
                  <motion.button
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setSelectedUser(user)}
                    className={`
                      w-full p-3 rounded-lg text-left transition-colors
                      ${selectedUser?.id === user.id 
                        ? 'bg-sapphire-500/10 border border-sapphire-500/30' 
                        : 'hover:bg-obsidian-800 border border-transparent'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar fallback={user.name.charAt(0)} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-platinum-100 truncate">{user.name}</p>
                          <StatusIcon className={`h-3 w-3 ${status.color}`} />
                        </div>
                        <p className="text-xs text-platinum-500 truncate">{user.email}</p>
                      </div>
                      <MoreHorizontal className="h-4 w-4 text-platinum-500" />
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-platinum-500">
                      <span>{user.connectedAccounts} accounts</span>
                      <span>{formatCurrency(user.totalValue, "INR", true)}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Portfolio Viewer */}
        <div className="lg:col-span-1">
          <Card variant="glass" className="p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-platinum-100">Portfolio</h2>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Full
              </Button>
            </div>

            {selectedUser ? (
              <div className="space-y-4">
                {/* User Info */}
                <div className="p-3 rounded-lg bg-obsidian-800/50">
                  <div className="flex items-center gap-3">
                    <Avatar fallback={selectedUser.name.charAt(0)} size="lg" />
                    <div>
                      <p className="font-medium text-platinum-100">{selectedUser.name}</p>
                      <p className="text-sm text-platinum-400">{selectedUser.email}</p>
                      <p className="text-xs text-platinum-500 mt-1">
                        Last active: {formatDate(selectedUser.lastActive, "relative")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Net Worth */}
                <div className="p-4 rounded-lg bg-obsidian-950 border border-obsidian-700">
                  <p className="text-xs text-platinum-500 uppercase tracking-wider">Total Net Worth</p>
                  <p className="text-2xl font-mono text-platinum-100 mt-1">
                    {formatCurrency(selectedUser.totalValue)}
                  </p>
                </div>

                {/* Allocation Breakdown */}
                <div>
                  <p className="text-sm font-medium text-platinum-300 mb-2">Allocation</p>
                  <div className="space-y-2">
                    {mockAllocations.slice(0, 4).map((alloc) => (
                      <div key={alloc.category} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: alloc.color }}
                          />
                          <span className="text-sm text-platinum-400 capitalize">
                            {alloc.category.replace("_", " ")}
                          </span>
                        </div>
                        <span className="text-sm font-mono text-platinum-300">
                          {alloc.percentage.toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 text-platinum-500">
                Select a user to view portfolio
              </div>
            )}
          </Card>
        </div>

        {/* Insight Editor */}
        <div className="lg:col-span-1">
          <Card variant="glass" className="p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-platinum-100">Push Insight</h2>
            </div>

            <div className="space-y-4">
              {/* Category Selection */}
              <div>
                <label className="text-xs text-platinum-400 uppercase tracking-wider">Category</label>
                <select 
                  value={insightCategory}
                  onChange={(e) => setInsightCategory(e.target.value as AssetCategory)}
                  className="w-full mt-1 h-10 px-3 bg-obsidian-800 border border-obsidian-600 rounded-lg text-platinum-100 focus:outline-none focus:border-sapphire-500"
                >
                  <option value="all">All Categories</option>
                  {assetCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {/* Priority Selection */}
              <div>
                <label className="text-xs text-platinum-400 uppercase tracking-wider">Priority</label>
                <div className="flex gap-2 mt-1">
                  {(["high", "medium", "low"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setInsightPriority(p)}
                      className={`
                        flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors
                        ${insightPriority === p 
                          ? p === "high" 
                            ? "bg-ruby-500/20 text-ruby-400 border border-ruby-500/30"
                            : p === "medium"
                              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                              : "bg-sapphire-500/20 text-sapphire-400 border border-sapphire-500/30"
                          : "bg-obsidian-800 text-platinum-400 border border-obsidian-600 hover:border-obsidian-500"
                        }
                      `}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="text-xs text-platinum-400 uppercase tracking-wider">Title</label>
                <input 
                  type="text"
                  placeholder="Insight title..."
                  value={insightTitle}
                  onChange={(e) => setInsightTitle(e.target.value)}
                  className="w-full mt-1 h-10 px-3 bg-obsidian-800 border border-obsidian-600 rounded-lg text-platinum-100 placeholder:text-platinum-500 focus:outline-none focus:border-sapphire-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs text-platinum-400 uppercase tracking-wider">Description</label>
                <textarea 
                  placeholder="Insight description..."
                  value={insightDescription}
                  onChange={(e) => setInsightDescription(e.target.value)}
                  rows={4}
                  className="w-full mt-1 p-3 bg-obsidian-800 border border-obsidian-600 rounded-lg text-platinum-100 placeholder:text-platinum-500 focus:outline-none focus:border-sapphire-500 resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button className="w-full gap-2">
                <Send className="h-4 w-4" />
                Push to User
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
