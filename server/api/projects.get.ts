import { Project } from "~~/shared/types/project"

export default defineEventHandler(async (event): Promise<Project[]> => {
    // Simulate DB delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return [
        { id: 1, name: 'SaaS Dashboard', status: 'active', description: 'Main admin panel' },
        { id: 2, name: 'Landing Page', status: 'active', description: 'Public marketing site' },
        { id: 3, name: 'Auth Module', status: 'archived', description: 'Legacy login system' },
    ]
})