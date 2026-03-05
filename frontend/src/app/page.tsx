"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  Play, 
  Mail, 
  FileText, 
  BarChart3, 
  Shield, 
  Lock, 
  Server, 
  CheckCircle2,
  Sparkles,
  Layers,
  Zap,
  EyeOff,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Mail,
    title: "Automated Statement Extraction",
    description: "Connect your email and watch as investment statements are automatically detected and parsed from your inbox.",
  },
  {
    icon: Layers,
    title: "Unified Net Worth Tracking",
    description: "See your complete financial picture across all institutions in one centralized dashboard.",
  },
  {
    icon: BarChart3,
    title: "Categorized Investments",
    description: "Stocks, mutual funds, F&O, insurance, and bank deposits organized in dedicated views.",
  },
  {
    icon: Sparkles,
    title: "Financial Insights",
    description: "Receive personalized recommendations and alerts based on your portfolio composition.",
  },
  {
    icon: Lock,
    title: "Secure Encrypted Pipeline",
    description: "End-to-end encryption ensures your financial data remains protected at all times.",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Dashboard refreshes within 60 seconds of new statement arrival.",
  },
];

const steps = [
  {
    number: "01",
    title: "Connect Email",
    description: "Securely link your Gmail or Outlook account using OAuth.",
  },
  {
    number: "02",
    title: "Statements Detected",
    description: "Our system continuously scans for investment-related emails.",
  },
  {
    number: "03",
    title: "PDFs Parsed",
    description: "Advanced ML algorithms extract structured data from statements.",
  },
  {
    number: "04",
    title: "Dashboard Updates",
    description: "Your consolidated portfolio view updates in real-time.",
  },
];

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All data encrypted in transit and at rest using AES-256.",
  },
  {
    icon: EyeOff,
    title: "Privacy-First Architecture",
    description: "We never sell your data. You control what we store.",
  },
  {
    icon: Database,
    title: "Minimal Data Storage",
    description: "Only structured financial data is retained. Raw documents are processed and discarded.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-obsidian-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-obsidian-700/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-sapphire-500 to-emerald-500 flex items-center justify-center">
              <span className="font-display text-white text-lg">V</span>
            </div>
            <span className="font-heading font-semibold text-platinum-100 text-lg">Vaultix</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-platinum-400 hover:text-platinum-200 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-platinum-400 hover:text-platinum-200 transition-colors">How it Works</a>
            <a href="#security" className="text-sm text-platinum-400 hover:text-platinum-200 transition-colors">Security</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient mesh */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-sapphire-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-800 border border-obsidian-700 text-xs text-platinum-400 mb-6">
                <Sparkles className="h-3 w-3" />
                <span className="tracking-wider">INVESTMENT INTELLIGENCE</span>
              </div>

              <h1 className="font-display text-5xl lg:text-6xl text-platinum-100 leading-[1.1] mb-6">
                Your Complete{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sapphire-400 to-emerald-400">
                  Investment Ledger
                </span>
              </h1>

              <p className="text-xl text-platinum-300 mb-8 max-w-lg">
                Automatically consolidate investment statements from every financial institution into a single intelligent dashboard.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="gap-2">
                    Connect Your Inbox
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="secondary" size="lg" className="gap-2">
                  <Play className="h-4 w-4" />
                  View Demo
                </Button>
              </div>

              <div className="mt-10 flex items-center gap-6 text-sm text-platinum-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>No credit card required</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - 3D Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Dashboard preview card */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-obsidian-800 to-obsidian-900 border border-obsidian-700/50 p-6 shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-ruby-500" />
                      <div className="h-3 w-3 rounded-full bg-amber-500" />
                      <div className="h-3 w-3 rounded-full bg-emerald-500" />
                    </div>
                    <div className="h-2 w-20 rounded-full bg-obsidian-700" />
                  </div>

                  {/* Net Worth */}
                  <div className="mb-6">
                    <p className="text-xs text-platinum-500 uppercase tracking-wider mb-1">Total Net Worth</p>
                    <p className="font-mono text-3xl text-platinum-100">₹24,85,32,150</p>
                    <p className="text-sm text-emerald-400 mt-1">+12.4% this month</p>
                  </div>

                  {/* Chart placeholder */}
                  <div className="h-32 rounded-lg bg-obsidian-950/50 border border-obsidian-700/50 mb-6 flex items-center justify-center">
                    <div className="flex items-end gap-2 h-20">
                      {[40, 65, 45, 80, 55, 90].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                          className="w-6 rounded-t"
                          style={{
                            backgroundColor: ['#3B82F6', '#8B5CF6', '#F59E0B', '#10B981', '#6366F6', '#71717A'][i],
                            opacity: 0.8
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Holdings list */}
                  <div className="space-y-3">
                    {[
                      { name: "HDFC Bank", value: "₹45,23,000", change: "+2.3%" },
                      { name: "Reliance Industries", value: "₹38,12,500", change: "+1.8%" },
                      { name: "ICICI Prudential MF", value: "₹28,45,000", change: "+0.5%" },
                    ].map((holding, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-obsidian-800/50">
                        <span className="text-sm text-platinum-300">{holding.name}</span>
                        <div className="text-right">
                          <p className="text-sm text-platinum-100">{holding.value}</p>
                          <p className="text-xs text-emerald-400">{holding.change}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 p-3 glass-panel rounded-xl"
                >
                  <FileText className="h-5 w-5 text-sapphire-400" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-4 -left-4 p-3 glass-panel rounded-xl"
                >
                  <Shield className="h-5 w-5 text-emerald-400" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Demo Section */}
      <section id="demo" className="py-20 bg-obsidian-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl text-platinum-100 mb-4">
              From Inbox to Insight
            </h2>
            <p className="text-lg text-platinum-400 max-w-2xl mx-auto">
              Watch how your scattered investment statements transform into a unified financial dashboard.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Mail, title: "Email Detected", color: "sapphire" },
              { icon: FileText, title: "PDF Parsed", color: "amber" },
              { icon: BarChart3, title: "Data Structured", color: "emerald" },
              { icon: Layers, title: "Dashboard Updated", color: "violet" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <Card variant="glass" className="text-center p-8">
                  <div className={`
                    w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center
                    ${step.color === 'sapphire' ? 'bg-sapphire-500/20' : ''}
                    ${step.color === 'amber' ? 'bg-amber-500/20' : ''}
                    ${step.color === 'emerald' ? 'bg-emerald-500/20' : ''}
                    ${step.color === 'violet' ? 'bg-violet-500/20' : ''}
                  `}>
                    <step.icon className={`
                      h-8 w-8
                      ${step.color === 'sapphire' ? 'text-sapphire-400' : ''}
                      ${step.color === 'amber' ? 'text-amber-400' : ''}
                      ${step.color === 'emerald' ? 'text-emerald-400' : ''}
                      ${step.color === 'violet' ? 'text-violet-400' : ''}
                    `} />
                  </div>
                  <h3 className="text-lg font-semibold text-platinum-100 mb-2">{step.title}</h3>
                  <p className="text-sm text-platinum-400">
                    {i === 0 && "Investment emails automatically identified"}
                    {i === 1 && "Structured data extracted from PDFs"}
                    {i === 2 && "Normalized into JSON schema"}
                    {i === 3 && "Dashboard reflects changes instantly"}
                  </p>
                </Card>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="h-5 w-5 text-platinum-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl text-platinum-100 mb-4">
              Everything you need to track your wealth
            </h2>
            <p className="text-lg text-platinum-400 max-w-2xl mx-auto">
              A complete suite of tools designed for the modern investor.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="glass" className="h-full hover:border-sapphire-500/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-sapphire-500/10 flex items-center justify-center mb-4 group-hover:bg-sapphire-500/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-sapphire-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-platinum-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-platinum-400">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-obsidian-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl text-platinum-100 mb-4">
              How it works
            </h2>
            <p className="text-lg text-platinum-400 max-w-2xl mx-auto">
              Get started in minutes. Connect, wait, and watch your wealth come together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-emerald-500/50 flex items-center justify-center">
                  <span className="font-mono text-xl text-emerald-400">{step.number}</span>
                </div>
                <h3 className="text-lg font-semibold text-platinum-100 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-platinum-400">
                  {step.description}
                </p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-emerald-500/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl text-platinum-100 mb-4">
              Your data, secured
            </h2>
            <p className="text-lg text-platinum-400 max-w-2xl mx-auto">
              Enterprise-grade security built into every layer of our platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {securityFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="default" className="h-full text-center p-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-platinum-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-platinum-400">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-900 via-sapphire-900/20 to-obsidian-900" />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl lg:text-5xl text-platinum-100 mb-6">
              Connect your inbox and reveal your net worth.
            </h2>
            <p className="text-xl text-platinum-300 mb-8">
              Join thousands of investors who finally have clarity on their complete financial picture.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 text-lg px-8 py-6">
                Get Started Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-obsidian-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-gradient-to-br from-sapphire-500 to-emerald-500 flex items-center justify-center">
                <span className="font-display text-white text-sm">V</span>
              </div>
              <span className="font-heading font-semibold text-platinum-200">Vaultix</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-platinum-400">
              <a href="#" className="hover:text-platinum-200 transition-colors">Privacy</a>
              <a href="#" className="hover:text-platinum-200 transition-colors">Terms</a>
              <a href="#" className="hover:text-platinum-200 transition-colors">Contact</a>
            </div>

            <p className="text-sm text-platinum-500">
              © 2026 Vaultix. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
