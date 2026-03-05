import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { createError } from './errorHandler.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthRequest extends Request {
  userId?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next(createError('No token provided', 401));
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string; name: string };
    req.userId = decoded.userId;
    req.user = decoded as any;
    next();
  } catch (error) {
    next(createError('Invalid token', 401));
  }
}

export function generateToken(userId: string, email: string, name: string): string {
  return jwt.sign({ userId, email, name }, JWT_SECRET, { expiresIn: '7d' });
}
