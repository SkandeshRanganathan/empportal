import { Request, Response } from 'express';
import { repository } from '../repository/json.repository';

export const login = async (req: Request, res: Response) => {
    try {
        const { userId, password, role } = req.body;
        
        const user = await repository.getUserByUserId(userId);
        
        if (!user || user.password !== password || user.role !== role) {
            return res.status(401).json({ message: 'Invalid credentials or role' });
        }
        
        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;
        
        // In a real app, you would return a JWT here
        res.json({
            message: 'Login successful',
            user: userWithoutPassword
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during login' });
    }
};
