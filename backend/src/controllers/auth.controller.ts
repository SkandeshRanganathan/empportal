import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { repository } from '../repository/json.repository';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-local-dev';

export const login = async (req: Request, res: Response) => {
    try {
        const { userId, password, role } = req.body;
        
        const user = await repository.getUserByUserId(userId);
        
        if (!user || user.password !== password || user.role !== role) {
            return res.status(401).json({ message: 'Invalid credentials or role' });
        }
        
        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;
        
        // Generate JWT
        const token = jwt.sign(
            { id: user.id, userId: user.userId, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        res.json({
            message: 'Login successful',
            token,
            user: userWithoutPassword
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during login' });
    }
};
