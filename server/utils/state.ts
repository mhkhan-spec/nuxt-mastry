import type { Task } from "~~/shared/types/task"

// Shared in-memory mock "database"
// Nuxt auto-imports from server/utils, but we can also export it explicitly
export const tasksMock: Record<string, Task[]> = {
    '1': [
        { id: 101, title: 'Define project scope' },
        { id: 102, title: 'Design initial wireframes' }
    ],
    '2': [
        { id: 201, title: 'Set up repository' },
        { id: 202, title: 'Configure CI/CD' }
    ],
    '3': [
        { id: 301, title: 'Review legacy auth' }
    ]
}
