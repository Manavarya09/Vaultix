import { Router, Request, Response } from 'express';
import { generateToken } from '../middleware/auth.js';

const router = Router();

// Mock user for demo
const mockUser = {
  id: 'user-1',
  email: 'demo@vaultix.com',
  name: 'Demo User',
};

// POST /api/auth/google
router.post('/google', (req: Request, res: Response) => {
  // In production: Exchange Google auth code for tokens
  // Then create/update user in database
  const token = generateToken(mockUser.id, mockUser.email, mockUser.name);
  
  res.json({
    token,
    user: mockUser,
  });
});

// POST /api/auth/outlook
router.post('/outlook', (req: Request, res: Response) => {
  // In production: Exchange Outlook auth code for tokens
  const token = generateToken(mockUser.email, mockUser.id, mockUser.name);
  
  res.json({
    token,
    user: mockUser,
  });
});

// POST /api/auth/logout
router.post('/logout', (req: Request, res: Response) => {
  // In production: Invalidate token in database
  res.json({ success: true });
});

// GET /api/auth/me
router.get('/me', (req: Request, res: Response) => {
  // In production: Get user from database using token
  res.json({ user: mockUser });
});

export default router;
