import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Mock data - in production, fetch from database
const mockInvestments = [
  {
    id: '1',
    institution: 'CDSL',
    accountType: 'Demat',
    assetCategory: 'stocks',
    holdings: [
      { name: 'HDFC Bank', quantity: 5000, price: 1800, value: 9000000 },
    ],
    totalValue: 248532150,
    statementDate: '2026-03-01',
  },
];

const mockAllocations = [
  { category: 'stocks', value: 125000000, percentage: 50.3 },
  { category: 'mutual_funds', value: 55000000, percentage: 22.1 },
  { category: 'fo', value: 32000000, percentage: 12.9 },
  { category: 'insurance', value: 20000000, percentage: 8.0 },
  { category: 'bank_deposits', value: 12532150, percentage: 5.0 },
  { category: 'other', value: 4000000, percentage: 1.6 },
];

// GET /api/investments
router.get('/', authenticate, (req: AuthRequest, res: Response) => {
  res.json({ investments: mockInvestments });
});

// GET /api/investments/summary
router.get('/summary', authenticate, (req: AuthRequest, res: Response) => {
  res.json({
    totalNetWorth: 248532150,
    change: 12.4,
    changeValue: 27450000,
    allocations: mockAllocations,
  });
});

// GET /api/investments/by-category/:category
router.get('/by-category/:category', authenticate, (req: AuthRequest, res: Response) => {
  const { category } = req.params;
  const investments = mockInvestments.filter(i => i.assetCategory === category);
  res.json({ investments, category });
});

// GET /api/investments/:id
router.get('/:id', authenticate, (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const investment = mockInvestments.find(i => i.id === id);
  
  if (!investment) {
    return res.status(404).json({ error: 'Investment not found' });
  }
  
  res.json({ investment });
});

export default router;
