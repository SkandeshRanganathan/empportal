import { Request, Response } from 'express';
import { repository } from '../repository/json.repository';

export const getRecords = async (req: Request, res: Response) => {
    try {
        const { userId, role, delay } = req.query;
        
        // Artificial delay if '?delay=X' is provided
        if (delay) {
            const delayMs = parseInt(delay as string, 10);
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }

        if (!userId || !role) {
            return res.status(400).json({ message: 'Missing userId or role query parameters' });
        }

        let records;
        if (role === 'Admin') {
            // Admin sees all records
            records = await repository.getAllRecords();
        } else {
            // General user sees only their records
            records = await repository.getRecordsByUserId(userId as string);
        }

        res.json(records);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching records' });
    }
};
