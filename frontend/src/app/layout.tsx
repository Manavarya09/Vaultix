import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vaultix | Your Complete Investment Ledger",
  description: "Automatically consolidate investment statements from every financial institution into a single intelligent dashboard.",
  keywords: ["investment", "finance", "portfolio", "net worth", "statement consolidation", "fintech"],
  authors: [{ name: "Vaultix" }],
  openGraph: {
    title: "Vaultix | Your Complete Investment Ledger",
    description: "Automatically consolidate investment statements from every financial institution into a single intelligent dashboard.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-obsidian-900">
        {children}
      </body>
    </html>
  );
}
