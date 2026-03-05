import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Mock email accounts
const mockAccounts = [
  { id: '1', provider: 'gmail', email: 'user@gmail.com', status: 'connected', lastSync: '2026-03-05T10:00:00Z' },
];

// GET /api/email/accounts
router.get('/accounts', authenticate, (req: AuthRequest, res: Response) => {
  res.json({ accounts: mockAccounts });
});

// POST /api/email/connect/gmail
router.post('/connect/gmail', authenticate, (req: AuthRequest, res: Response) => {
  // In production: Initiate OAuth flow
  res.json({ 
    authUrl: 'https://accounts.google.com/oauth/authorize?...' 
  });
});

// POST /api/email/connect/outlook
router.post('/connect/outlook', authenticate, (req: AuthRequest, res: Response) => {
  // In production: Initiate OAuth flow
  res.json({ 
    authUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize' 
  });
});

// POST /api/email/disconnect/:accountId
router.post('/disconnect/:accountId', authenticate, (req: AuthRequest, res: Response) => {
  const { accountId } = req.params;
  // In production: Revoke tokens and remove account
  res.json({ success: true, accountId });
});

// POST /api/email/sync/:accountId
router.post('/sync/:accountId', authenticate, (req: AuthRequest, res: Response) => {
  const { accountId } = req.params;
  // In production: Trigger email sync worker
  res.json({ success: true, accountId, status: 'syncing' });
});

export default router;
