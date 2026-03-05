import React from "react";
import Link from "next/link";
import { 
  Search, 
  Bell, 
  Settings, 
  Home,
  Users,
  BarChart3,
  MessageSquare,
  ChevronRight,
  Plus,
  Filter,
  Download,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-obsidian-900">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 glass-panel border-b border-obsidian-700/50">
        <div className="h-full max-w-[1800px] mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-sapphire-500 to-emerald-500 flex items-center justify-center">
                <span className="font-display text-white text-lg">V</span>
              </div>
              <span className="font-heading font-semibold text-platinum-100 text-lg">Vaultix</span>
            </Link>
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 ml-4 text-sm">
              <Link href="/dashboard" className="text-platinum-400 hover:text-platinum-200">
                Dashboard
              </Link>
              <ChevronRight className="h-4 w-4 text-platinum-600" />
              <span className="text-platinum-200">Admin</span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-obsidian-800 transition-colors">
              <Bell className="h-5 w-5 text-platinum-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-ruby-500 rounded-full" />
            </button>

            {/* User Menu */}
            <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-obsidian-800 transition-colors">
              <Avatar fallback="A" size="sm" />
              <span className="hidden lg:block text-sm text-platinum-300">Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-[1800px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
