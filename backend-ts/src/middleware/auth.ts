import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    await AuthService.protect(req, res, next);
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

