export type Role = 'Admin' | 'General User';

export interface User {
    id: string;
    userId: string;
    password?: string;
    role: Role;
    name: string;
}
