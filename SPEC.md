# Vaultix - Investment Intelligence Platform

## Project Overview

**Project Name:** Vaultix  
**Type:** Production-grade fintech web platform  
**Core Functionality:** Automated investment statement consolidation from emails, PDF parsing, and unified financial intelligence dashboard  
**Target Users:** High-net-worth investors, financial advisors, and portfolio managers

---

## UI/UX Specification

### Design Philosophy

The interface draws from:
- Bloomberg Terminal's data density and precision
- Apple Wallet's glass morphism and layered depth
- Stripe Dashboard's refined typography and micro-interactions
- Linear.app's keyboard-driven efficiency

### Color Palette

```css
--obsidian-900: #0A0A0B;        /* Primary background - deep black */
--obsidian-800: #111113;        /* Card backgrounds */
--obsidian-700: #18181B;        /* Elevated surfaces */
--obsidian-600: #27272A;        /* Borders, dividers */
--obsidian-500: #3F3F46;        /* Muted text */

--platinum-100: #FAFAFA;        /* Primary text */
--platinum-200: #E4E4E7;        /* Headings */
--platinum-300: #A1A1AA;        /* Body text */
--platinum-400: #71717A;        /* Captions */

--emerald-500: #10B981;         /* Positive values, gains */
--emerald-400: #34D399;         /* Hover states */
--emerald-600: #059669;         /* Active states */

--ruby-500: #EF4444;            /* Negative values, losses */
--ruby-400: #F87171;            /* Hover states */
--ruby-600: #DC2626;            /* Active states */

--amber-500: #F59E0B;           /* Warnings, pending */
--amber-400: #FBBF24;           /* Highlights */

--sapphire-500: #3B82F6;        /* Links, interactive */
--sapphire-400: #60A5FA;       /* Hover */
--sapphire-600: #2563EB;       /* Active */

--glass-white: rgba(255, 255, 255, 0.03);
--glass-border: rgba(255, 255, 255, 0.06);
--glass-highlight: rgba(255, 255, 255, 0.08);
```

### Typography

```css
--font-display: 'Instrument Serif', Georgia, serif;
--font-heading: 'DM Sans', system-ui, sans-serif;
--font-body: 'DM Sans', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

--text-xs: 0.75rem;     /* 12px - labels */
--text-sm: 0.875rem;   /* 14px - captions */
--text-base: 1rem;     /* 16px - body */
--text-lg: 1.125rem;   /* 18px - lead */
--text-xl: 1.25rem;    /* 20px - subheadings */
--text-2xl: 1.5rem;    /* 24px - headings */
--text-3xl: 1.875rem;  /* 30px - hero */
--text-4xl: 2.25rem;   /* 36px - display */
--text-5xl: 3rem;      /* 48px - billboard */
```

### Spacing System

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
```

### Visual Effects

```css
/* Glass morphism */
--glass-bg: backdrop-blur-xl bg-obsidian-800/80;
--glass-border: 1px solid glass-border;
--glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

/* Inner shadows for depth */
--inner-shadow-sm: inset 0 1px 2px rgba(0, 0, 0, 0.3);
--inner-shadow-md: inset 0 2px 4px rgba(0, 0, 0, 0.3);
--inner-shadow-lg: inset 0 4px 8px rgba(0, 0, 0, 0.4);

/* Glow effects */
--glow-emerald: 0 0 20px rgba(16, 185, 129, 0.3);
--glow-ruby: 0 0 20px rgba(239, 68, 68, 0.3);
--glow-sapphire: 0 0 20px rgba(59, 130, 246, 0.3);

/* Transitions */
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

---

## Component Specifications

### 1. NetWorthCard

**Appearance:**
- Deep obsidian background with subtle glass overlay
- Inner shadow for recessed LED display effect
- Large serif numeral for total value
- Animated ticker for live updates
- Micro-sparkline showing 7-day trend

**Dimensions:** 100% width, min-height 180px  
**States:** Loading (shimmer), Loaded, Updating (pulse), Error

### 2. AllocationChart

**Appearance:**
- Donut chart with glass bezel effect
- Animated arc drawing on load
- Center shows total with category breakdown below
- Legend with color-coded categories

**Dimensions:** 280px × 280px  
**Categories:** Stocks, Mutual Funds, F&O, Insurance, Bank Deposits, Other

### 3. InvestmentTabs

**Appearance:**
- Machined metal tab bar with brushed texture
- Active tab appears raised with highlight rim
- Tab count badges with subtle glow
- Smooth slide transition between tabs

**Categories:**
- Stocks (bar-chart icon)
- Mutual Funds (pie-chart icon)
- F&O (trending-up icon)
- Insurance (shield icon)
- Bank Deposits (building icon)
- Other Assets (wallet icon)

### 4. HoldingsTable

**Appearance:**
- Financial ledger aesthetic with alternating row opacity
- Sticky header with sort indicators
- Value cells right-aligned in monospace
- Change indicators with colored arrows
- Expandable rows for detail view

**Columns:** Institution, Holding, Quantity, Price, Value, Change, Action

### 5. InsightSidebar

**Appearance:**
- Floating glass panel, right-aligned
- Icon + title + description format
- Priority indicators (high: ruby, medium: amber, low: emerald)
- Timestamp and dismiss option
- Slide-in animation

### 6. StatementHistoryPanel

**Appearance:**
- Timeline view with connecting line
- Institution logos as nodes
- Expandable statement preview
- Download/reprocess actions
- Status indicators (processed, pending, failed)

---

## Landing Page Specifications

### Hero Section

**Layout:** Two-column (60/40 split)
**Background:** Subtle animated gradient mesh on obsidian
**Left Column:**
- Eyebrow: "INVESTMENT INTELLIGENCE" (tracking-widest, letter-spacing)
- Headline: "Your Complete Investment Ledger" (Instrument Serif, 56px)
- Subheadline: "Automatically consolidate investment statements from every financial institution into a single intelligent dashboard." (DM Sans, 20px, platinum-300)
- CTA Button: "Connect Your Inbox" (sapphire gradient, glow effect)
- Secondary: "View Demo" with play icon

**Right Column:**
- 3D isometric dashboard preview
- Floating investment cards with parallax
- Subtle particle effect in background

### Product Demo Section

**Layout:** Horizontal scroll with 4 steps
**Animation:** Sequential reveal on scroll
**Steps:**
1. Email detected → envelope icon scan animation
2. PDF statement parsed → document transform animation
3. Data structured → table build animation
4. Dashboard updated → card flip animation

### Features Section

**Layout:** 2×3 grid with glass cards
**Card Design:**
- Icon (32px, emerald glow)
- Title (DM Sans, 18px, bold)
- Description (DM Sans, 14px, platinum-400)
- Hover: subtle lift and border glow

**Features:**
1. Automated Statement Extraction
2. Unified Net Worth Tracking
3. Categorized Investments
4. Financial Insights
5. Secure Encrypted Pipeline
6. Real-time Updates

### How It Works Section

**Layout:** 4-step horizontal timeline
**Step Design:**
- Number badge (circular, emerald outline)
- Title
- Description
- Connection line between steps

**Steps:**
1. Connect Email → OAuth flow
2. Statements Detected → Background scan
3. PDFs Parsed → ML extraction
4. Dashboard Updates → Real-time sync

### Security Section

**Layout:** Three-column with icons
**Elements:**
- Lock icon + "End-to-End Encryption"
- Eye-slash icon + "Privacy-First Architecture"
- Server icon + "Minimal Data Storage"

### CTA Section

**Background:** Radial gradient (sapphire to obsidian)
**Headline:** "Connect your inbox and reveal your net worth."
**Button:** Large, glowing, animated gradient

---

## Application Dashboard Specifications

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER: Logo | Search | Notifications | Profile            │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ NET WORTH PANEL: Total | Change | Trend                │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ ┌───────────────────────────┬─────────────────────────────┐ │
│ │ ALLOCATION CHART          │ INSIGHTS SIDEBAR           │ │
│ │ (Donut in glass bezel)    │ (Floating glass panel)     │ │
│ └───────────────────────────┴─────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ CATEGORY TABS: Stocks | MF | F&O | Insurance | Bank |.. │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ HOLDINGS TABLE                                        │ │
│ │ Institution | Holding | Qty | Price | Value | Change  │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ STATEMENT HISTORY TIMELINE                             │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Admin Panel Specifications

**Route:** `/admin`

**Layout:**
- Left sidebar: User list with search
- Main area: Portfolio viewer
- Right panel: Insight editor

**Features:**
- User search with filters
- Portfolio snapshot viewer
- Category recommendation editor
- Bulk insight推送

---

## Data Models

### User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  connectedAccounts: ConnectedAccount[];
  createdAt: Date;
  updatedAt: Date;
}
```

### ConnectedAccount
```typescript
interface ConnectedAccount {
  id: string;
  provider: 'gmail' | 'outlook';
  email: string;
  accessToken: string;
  refreshToken: string;
  status: 'active' | 'error' | 'disconnected';
}
```

### Investment
```typescript
interface Investment {
  id: string;
  userId: string;
  institution: string;
  accountType: AccountType;
  assetCategory: AssetCategory;
  holdings: Holding[];
  totalValue: number;
  statementDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Holding
```typescript
interface Holding {
  id: string;
  name: string;
  symbol?: string;
  quantity: number;
  price: number;
  value: number;
  change: number;
  changePercent: number;
}
```

### Insight
```typescript
interface Insight {
  id: string;
  userId: string;
  category: AssetCategory;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  createdAt: Date;
  dismissed: boolean;
}
```

### Statement
```typescript
interface Statement {
  id: string;
  userId: string;
  institution: string;
  accountType: AccountType;
  assetCategory: AssetCategory;
  statementDate: Date;
  fileUrl: string;
  status: 'pending' | 'processing' | 'processed' | 'failed';
  extractedData?: JSON;
  createdAt: Date;
}
```

---

## API Endpoints

### Authentication
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/outlook` - Outlook OAuth
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Investments
- `GET /api/investments` - Get all investments
- `GET /api/investments/summary` - Get net worth summary
- `GET /api/investments/by-category/:category` - Get by category
- `GET /api/investments/:id` - Get specific investment

### Insights
- `GET /api/insights` - Get user insights
- `POST /api/insights/:id/dismiss` - Dismiss insight
- `POST /api/insights` - Create insight (admin)

### Statements
- `GET /api/statements` - Get statement history
- `POST /api/statements/process/:id` - Reprocess statement

### Admin
- `GET /api/admin/users` - List users
- `GET /api/admin/users/:id` - Get user details
- `GET /api/admin/users/:id/portfolio` - Get portfolio
- `POST /api/admin/insights` - Create insight for user

---

## Acceptance Criteria

### Landing Page
- [ ] Hero section displays with animated background
- [ ] Product demo animates on scroll
- [ ] Feature cards have hover effects
- [ ] CTA buttons have glow animations
- [ ] Fully responsive (mobile to desktop)

### Dashboard
- [ ] Net worth card shows animated value
- [ ] Allocation chart renders with animation
- [ ] Category tabs switch with smooth transition
- [ ] Holdings table is sortable and searchable
- [ ] Insights sidebar shows recommendations
- [ ] Statement history shows timeline

### Performance
- [ ] Dashboard loads within 2 seconds
- [ ] Tab switches feel instant (<100ms)
- [ ] Charts animate smoothly (60fps)
- [ ] No layout shifts during load

### Security
- [ ] All API routes require authentication
- [ ] Tokens are stored securely
- [ ] No sensitive data in localStorage
- [ ] CORS configured properly

---

## File Structure

```
vaultix/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx (landing)
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   └── admin/
│   │       ├── page.tsx
│   │       └── layout.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── dashboard/
│   │   └── landing/
│   ├── lib/
│   │   ├── utils.ts
│   │   └── hooks.ts
│   ├── styles/
│   │   └── globals.css
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── index.ts
│   └── package.json
├── docker-compose.yml
└── README.md
```
