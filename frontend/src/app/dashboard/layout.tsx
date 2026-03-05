import React from "react";
import Link from "next/link";
import { 
  Search, 
  Bell, 
  Settings, 
  LogOut, 
  Menu,
  X,
  ChevronDown,
  User,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

export default function DashboardLayout({
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
              <span className="font-heading font-semibold text-platinum-100 text-lg hidden sm:block">Vaultix</span>
            </Link>
            
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 ml-8 px-3 py-1.5 rounded-lg bg-obsidian-800 border border-obsidian-700 w-64">
              <Search className="h-4 w-4 text-platinum-500" />
              <input 
                type="text" 
                placeholder="Search investments..."
                className="bg-transparent border-none outline-none text-sm text-platinum-200 placeholder:text-platinum-500 w-full"
              />
              <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-obsidian-700 text-xs text-platinum-500">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Connect Email Button */}
            <Button variant="primary" size="sm" className="hidden sm:flex gap-2">
              <Plus className="h-4 w-4" />
              Connect Email
            </Button>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-obsidian-800 transition-colors">
              <Bell className="h-5 w-5 text-platinum-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-ruby-500 rounded-full" />
            </button>

            {/* Settings */}
            <Link href="/admin">
              <button className="p-2 rounded-lg hover:bg-obsidian-800 transition-colors">
                <Settings className="h-5 w-5 text-platinum-400" />
              </button>
            </Link>

            {/* User Menu */}
            <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-obsidian-800 transition-colors">
              <Avatar fallback="A" size="sm" />
              <span className="hidden lg:block text-sm text-platinum-300">Account</span>
              <ChevronDown className="h-4 w-4 text-platinum-500" />
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
