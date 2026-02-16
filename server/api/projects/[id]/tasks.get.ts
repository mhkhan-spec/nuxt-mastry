import type { Task } from "~~/shared/types/task"
import { tasksMock } from "~~/server/utils/state"

// In-memory mock "database" is now in server/utils/state.ts
// Nuxt auto-imports exports from server/utils

export default defineEventHandler(async (event): Promise<Task[]> => {
    const projectId = getRouterParam(event, 'id')

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))

    if (!projectId || !tasksMock[projectId]) {
        return []
    }

    return tasksMock[projectId]
})
