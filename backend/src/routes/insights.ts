import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

const mockInsights = [
  {
    id: '1',
    category: 'stocks',
    priority: 'high',
    title: 'Portfolio Overexposed to Financial Sector',
    description: 'Your stocks allocation shows 45% exposure to financial services.',
    createdAt: '2026-03-04T10:30:00Z',
    dismissed: false,
  },
  {
    id: '2',
    category: 'fo',
    priority: 'medium',
    title: 'High F&O Margin Utilization',
    description: 'Your F&O positions are utilizing 85% of available margin.',
    createdAt: '2026-03-03T14:20:00Z',
    dismissed: false,
  },
];

// GET /api/insights
router.get('/', authenticate, (req: AuthRequest, res: Response) => {
  const { category } = req.query;
  
  let insights = mockInsights;
  if (category && category !== 'all') {
    insights = insights.filter(i => i.category === category);
  }
  
  res.json({ insights: insights.filter(i => !i.dismissed) });
});

// POST /api/insights/:id/dismiss
router.post('/:id/dismiss', authenticate, (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  // In production: Update in database
  res.json({ success: true, id });
});

// POST /api/insights (admin only)
router.post('/', authenticate, (req: AuthRequest, res: Response) => {
  const { userId, category, priority, title, description } = req.body;
  
  const insight = {
    id: `insight-${Date.now()}`,
    userId,
    category,
    priority,
    title,
    description,
    createdAt: new Date().toISOString(),
    dismissed: false,
  };
  
  res.json({ insight });
});

export default router;
