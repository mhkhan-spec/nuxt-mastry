export interface Project {
    id: number;
    name: string;
    status: 'active' | 'archived';
    description: string;
}