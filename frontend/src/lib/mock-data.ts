import { AssetCategory } from "@/lib/utils";

export interface Holding {
  id: string;
  name: string;
  symbol?: string;
  institution: string;
  quantity: number;
  price: number;
  value: number;
  change: number;
  changePercent: number;
}

export interface Investment {
  id: string;
  institution: string;
  accountType: string;
  assetCategory: AssetCategory;
  holdings: Holding[];
  totalValue: number;
  statementDate: string;
}

export interface Insight {
  id: string;
  category: AssetCategory | "all";
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  createdAt: string;
  dismissed: boolean;
}

export interface Statement {
  id: string;
  institution: string;
  accountType: string;
  assetCategory: AssetCategory;
  statementDate: string;
  status: "pending" | "processing" | "processed" | "failed";
}

export interface Allocation {
  category: AssetCategory;
  value: number;
  percentage: number;
  color: string;
}

export const mockNetWorth = {
  total: 248532150,
  change: 12.4,
  changeValue: 27450000,
  history: [
    { date: "2025-09", value: 185000000 },
    { date: "2025-10", value: 195000000 },
    { date: "2025-11", value: 210000000 },
    { date: "2025-12", value: 225000000 },
    { date: "2026-01", value: 232000000 },
    { date: "2026-02", value: 248532150 },
  ],
};

export const mockAllocations: Allocation[] = [
  { category: "stocks", value: 125000000, percentage: 50.3, color: "#3B82F6" },
  { category: "mutual_funds", value: 55000000, percentage: 22.1, color: "#8B5CF6" },
  { category: "fo", value: 32000000, percentage: 12.9, color: "#F59E0B" },
  { category: "insurance", value: 20000000, percentage: 8.0, color: "#10B981" },
  { category: "bank_deposits", value: 12532150, percentage: 5.0, color: "#6366F1" },
  { category: "other", value: 4000000, percentage: 1.6, color: "#71717A" },
];

export const mockHoldingsByCategory: Record<AssetCategory, Holding[]> = {
  stocks: [
    { id: "1", name: "HDFC Bank Ltd", symbol: "HDFCBANK", institution: "CDSL", quantity: 5000, price: 1800, value: 9000000, change: 230000, changePercent: 2.62 },
    { id: "2", name: "Reliance Industries Ltd", symbol: "RELIANCE", institution: "CDSL", quantity: 8000, price: 2450, value: 19600000, change: 450000, changePercent: 2.35 },
    { id: "3", name: "TCS Ltd", symbol: "TCS", institution: "CDSL", quantity: 3500, price: 3800, value: 13300000, change: -180000, changePercent: -1.34 },
    { id: "4", name: "Infosys Ltd", symbol: "INFY", institution: "CDSL", quantity: 12000, price: 1420, value: 17040000, change: 320000, changePercent: 1.91 },
    { id: "5", name: "ICICI Bank Ltd", symbol: "ICICIBANK", institution: "CDSL", quantity: 15000, price: 980, value: 14700000, change: 210000, changePercent: 1.45 },
    { id: "6", name: "Larsen & Toubro Ltd", symbol: "LT", institution: "CDSL", quantity: 4500, price: 3200, value: 14400000, change: 280000, changePercent: 1.98 },
    { id: "7", name: "State Bank of India", symbol: "SBIN", institution: "CDSL", quantity: 20000, price: 720, value: 14400000, change: -120000, changePercent: -0.83 },
  ],
  mutual_funds: [
    { id: "1", name: "ICICI Prudential Bluechip Fund", institution: "ICICI Prudential AMC", quantity: 150000, price: 85, value: 12750000, change: 85000, changePercent: 0.67 },
    { id: "2", name: "HDFC Top 100 Fund", institution: "HDFC AMC", quantity: 25000, price: 950, value: 23750000, change: 180000, changePercent: 0.76 },
    { id: "3", name: "SBI Small Cap Fund", institution: "SBI MF", quantity: 30000, price: 180, value: 5400000, change: -45000, changePercent: -0.83 },
    { id: "4", name: "Mirae Asset Large Cap Fund", institution: "Mirae Asset", quantity: 80000, price: 72, value: 5760000, change: 42000, changePercent: 0.73 },
    { id: "5", name: "Axis Long Term Equity Fund", institution: "Axis AMC", quantity: 15000, price: 480, value: 7200000, change: 55000, changePercent: 0.77 },
  ],
  fo: [
    { id: "1", name: "NIFTY 50 Futures Mar 2026", institution: "NSE F&O", quantity: 500, price: 22500, value: 11250000, change: 350000, changePercent: 3.21 },
    { id: "2", name: "NIFTY Bank Futures Mar 2026", institution: "NSE F&O", quantity: 800, price: 48000, value: 38400000, change: -520000, changePercent: -1.34 },
    { id: "3", name: "RELiance Futures Mar 2026", institution: "NSE F&O", quantity: 2000, price: 2450, value: 4900000, change: 120000, changePercent: 2.51 },
  ],
  insurance: [
    { id: "1", name: "LIC Jeevan Anand", institution: "LIC", quantity: 2, price: 8500000, value: 17000000, change: 0, changePercent: 0 },
    { id: "2", name: "HDFC Life Insurance", institution: "HDFC Life", quantity: 500, price: 600, value: 3000000, change: 50000, changePercent: 1.69 },
  ],
  bank_deposits: [
    { id: "1", name: "HDFC Bank Fixed Deposit", institution: "HDFC Bank", quantity: 1, price: 7532150, value: 7532150, change: 0, changePercent: 0 },
    { id: "2", name: "State Bank of India RD", institution: "SBI", quantity: 1, price: 5000000, value: 5000000, change: 0, changePercent: 0 },
  ],
  other: [
    { id: "1", name: "Gold ETFs", institution: "Gold", quantity: 100, price: 40000, value: 4000000, change: 150000, changePercent: 3.90 },
  ],
};

export const mockInsights: Insight[] = [
  {
    id: "1",
    category: "stocks",
    priority: "high",
    title: "Portfolio Overexposed to Financial Sector",
    description: "Your stocks allocation shows 45% exposure to financial services. Consider diversifying across sectors to reduce risk.",
    createdAt: "2026-03-04T10:30:00Z",
    dismissed: false,
  },
  {
    id: "2",
    category: "fo",
    priority: "medium",
    title: "High F&O Margin Utilization",
    description: "Your F&O positions are utilizing 85% of available margin. Consider reducing exposure or maintaining additional funds.",
    createdAt: "2026-03-03T14:20:00Z",
    dismissed: false,
  },
  {
    id: "3",
    category: "mutual_funds",
    priority: "low",
    title: "Review Underperforming Fund",
    description: "SBI Small Cap Fund has underperformed its benchmark by 2.3% over the last quarter.",
    createdAt: "2026-03-02T09:15:00Z",
    dismissed: false,
  },
  {
    id: "4",
    category: "insurance",
    priority: "medium",
    title: "Consider Term Insurance Addition",
    description: "Your current insurance coverage may not adequately protect your family's financial goals.",
    createdAt: "2026-03-01T11:45:00Z",
    dismissed: false,
  },
];

export const mockStatements: Statement[] = [
  { id: "1", institution: "CDSL", accountType: "Demat", assetCategory: "stocks", statementDate: "2026-03-01", status: "processed" },
  { id: "2", institution: "ICICI Prudential AMC", accountType: "MF", assetCategory: "mutual_funds", statementDate: "2026-02-28", status: "processed" },
  { id: "3", institution: "NSE F&O", accountType: "F&O", assetCategory: "fo", statementDate: "2026-02-27", status: "processed" },
  { id: "4", institution: "LIC", accountType: "Insurance", assetCategory: "insurance", statementDate: "2026-02-25", status: "processed" },
  { id: "5", institution: "HDFC Bank", accountType: "FD", assetCategory: "bank_deposits", statementDate: "2026-02-20", status: "processed" },
  { id: "6", institution: "CDSL", accountType: "Demat", assetCategory: "stocks", statementDate: "2026-02-15", status: "processed" },
];
