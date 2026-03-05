import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Mock users
const mockUsers = [
  { id: '1', name: 'Amit Sharma', email: 'amit.sharma@email.com', connectedAccounts: 3, totalValue: 248532150, lastActive: '2026-03-05', status: 'active' },
  { id: '2', name: 'Priya Patel', email: 'priya.patel@email.com', connectedAccounts: 2, totalValue: 185000000, lastActive: '2026-03-04', status: 'active' },
  { id: '3', name: 'Rahul Verma', email: 'rahul.verma@email.com', connectedAccounts: 1, totalValue: 95000000, lastActive: '2026-03-03', status: 'pending' },
];

// GET /api/admin/users
router.get('/users', authenticate, (req: AuthRequest, res: Response) => {
  const { search } = req.query;
  
  let users = mockUsers;
  if (search) {
    const query = (search as string).toLowerCase();
    users = users.filter(u => 
      u.name.toLowerCase().includes(query) || 
      u.email.toLowerCase().includes(query)
    );
  }
  
  res.json({ users });
});

// GET /api/admin/users/:id
router.get('/users/:id', authenticate, (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const user = mockUsers.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json({ user });
});

// GET /api/admin/users/:id/portfolio
router.get('/users/:id/portfolio', authenticate, (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  // In production: Fetch from database
  res.json({
    userId: id,
    totalValue: 248532150,
    allocations: [
      { category: 'stocks', value: 125000000, percentage: 50.3 },
      { category: 'mutual_funds', value: 55000000, percentage: 22.1 },
    ],
  });
});

// POST /api/admin/insights
router.post('/insights', authenticate, (req: AuthRequest, res: Response) => {
  const { userId, category, priority, title, description } = req.body;
  
  // In production: Create insight in database
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
  
  res.json({ success: true, insight });
});

export default router;
