import { Request, Response } from 'express';
import { repository } from '../repository/json.repository';
import { User, Role } from '../models/user.model';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await repository.getAllUsers();
        // Strip passwords
        const safeUsers = users.map(u => {
            const { password, ...rest } = u;
            return rest;
        });
        res.json(safeUsers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { userId, password, role, name } = req.body;
        const existing = await repository.getUserByUserId(userId);
        if (existing) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const newUser: User = {
            id: Date.now().toString(),
            userId,
            password,
            role: role as Role,
            name
        };
        
        await repository.addUser(newUser);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await repository.deleteUser(id as string);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};
