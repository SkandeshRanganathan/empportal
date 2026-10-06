import { Router } from 'express';
import { login } from './controllers/auth.controller';
import { getUsers, createUser, deleteUser } from './controllers/user.controller';
import { getRecords } from './controllers/records.controller';
import { authenticateJWT, requireAdmin } from './middleware/auth.middleware';
import { auditLog } from './middleware/audit.middleware';

const router = Router();

// Auth
router.post('/auth/login', login);

// Users (Admin only)
router.get('/users', authenticateJWT, requireAdmin, auditLog, getUsers);
router.post('/users', authenticateJWT, requireAdmin, auditLog, createUser);
router.delete('/users/:id', authenticateJWT, requireAdmin, auditLog, deleteUser);

// Records (Any authenticated user)
router.get('/records', authenticateJWT, getRecords);

export default router;
