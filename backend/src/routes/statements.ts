import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

const mockStatements = [
  { id: '1', institution: 'CDSL', accountType: 'Demat', assetCategory: 'stocks', statementDate: '2026-03-01', status: 'processed' },
  { id: '2', institution: 'ICICI Prudential AMC', accountType: 'MF', assetCategory: 'mutual_funds', statementDate: '2026-02-28', status: 'processed' },
  { id: '3', institution: 'NSE F&O', accountType: 'F&O', assetCategory: 'fo', statementDate: '2026-02-27', status: 'processed' },
  { id: '4', institution: 'LIC', accountType: 'Insurance', assetCategory: 'insurance', statementDate: '2026-02-25', status: 'processed' },
  { id: '5', institution: 'HDFC Bank', accountType: 'FD', assetCategory: 'bank_deposits', statementDate: '2026-02-20', status: 'processed' },
];

// GET /api/statements
router.get('/', authenticate, (req: AuthRequest, res: Response) => {
  res.json({ statements: mockStatements });
});

// POST /api/statements/process/:id
router.post('/process/:id', authenticate, (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  // In production: Trigger PDF reprocessing
  res.json({ success: true, id, status: 'processing' });
});

export default router;
