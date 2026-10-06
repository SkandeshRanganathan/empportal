import fs from 'fs/promises';
import path from 'path';
import { User } from '../models/user.model';
import { Record } from '../models/record.model';

const dbPath = path.join(__dirname, '../../data/db.json');

interface DatabaseSchema {
    users: User[];
    records: Record[];
}

class JsonRepository {
    private async readDb(): Promise<DatabaseSchema> {
        const data = await fs.readFile(dbPath, 'utf-8');
        return JSON.parse(data);
    }

    private async writeDb(data: DatabaseSchema): Promise<void> {
        await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
    }

    // --- Users ---
    async getAllUsers(): Promise<User[]> {
        const db = await this.readDb();
        return db.users;
    }

    async getUserByUserId(userId: string): Promise<User | undefined> {
        const db = await this.readDb();
        return db.users.find(u => u.userId === userId);
    }

    async addUser(user: User): Promise<User> {
        const db = await this.readDb();
        db.users.push(user);
        await this.writeDb(db);
        return user;
    }
    
    async deleteUser(id: string): Promise<void> {
        const db = await this.readDb();
        db.users = db.users.filter(u => u.id !== id);
        await this.writeDb(db);
    }

    // --- Records ---
    async getRecordsByUserId(userId: string): Promise<Record[]> {
        const db = await this.readDb();
        // If it's an admin requesting, they should get all records.
        // We will handle that logic in the controller.
        return db.records.filter(r => r.userId === userId);
    }

    async getAllRecords(): Promise<Record[]> {
        const db = await this.readDb();
        return db.records;
    }
}

export const repository = new JsonRepository();
