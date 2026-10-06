import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

export const auditLog = (req: AuthRequest, res: Response, next: NextFunction) => {
    // Log Admin actions
    if (req.user && req.user.role === 'Admin') {
        const timestamp = new Date().toISOString();
        const correlationId = req.headers['x-correlation-id'];
        console.log(`[AUDIT] ${timestamp} | Admin: ${req.user.userId} | Action: ${req.method} ${req.originalUrl} | CorrelationID: ${correlationId}`);
    }
    next();
};
