import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value: number,
  currency: string = "INR",
  compact: boolean = false
): string {
  if (compact && Math.abs(value) >= 10000000) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number, decimals: number = 2): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(decimals)}%`;
}

export function formatNumber(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatDate(date: Date | string, style: "short" | "long" | "relative" = "short"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  
  if (style === "relative") {
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  }
  
  if (style === "long") {
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function getChangeColor(value: number): string {
  if (value > 0) return "text-emerald-400";
  if (value < 0) return "text-ruby-400";
  return "text-platinum-400";
}

export function getChangeBgColor(value: number): string {
  if (value > 0) return "bg-emerald-500/10 text-emerald-400";
  if (value < 0) return "bg-ruby-500/10 text-ruby-400";
  return "bg-platinum-500/10 text-platinum-400";
}

export const assetCategories = [
  { id: "stocks", label: "Stocks", icon: "BarChart3" },
  { id: "mutual_funds", label: "Mutual Funds", icon: "PieChart" },
  { id: "fo", label: "F&O", icon: "TrendingUp" },
  { id: "insurance", label: "Insurance", icon: "Shield" },
  { id: "bank_deposits", label: "Bank Deposits", icon: "Building2" },
  { id: "other", label: "Other Assets", icon: "Wallet" },
] as const;

export type AssetCategory = typeof assetCategories[number]["id"];

export const categoryColors: Record<AssetCategory, string> = {
  stocks: "#3B82F6",
  mutual_funds: "#8B5CF6",
  fo: "#F59E0B",
  insurance: "#10B981",
  bank_deposits: "#6366F1",
  other: "#71717A",
};
