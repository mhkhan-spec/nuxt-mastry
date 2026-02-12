export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
    avatarUrl?: string;
}

export interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    lastLogin: string | null;
}