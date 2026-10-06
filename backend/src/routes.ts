import { Router } from 'express';
import { login } from './controllers/auth.controller';
import { getUsers, createUser, deleteUser } from './controllers/user.controller';
import { getRecords } from './controllers/records.controller';

const router = Router();

// Auth
router.post('/auth/login', login);

// Users (Admin only in reality, but mock DB doesn't have strict middleware yet)
router.get('/users', getUsers);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);

// Records
router.get('/records', getRecords);

export default router;
