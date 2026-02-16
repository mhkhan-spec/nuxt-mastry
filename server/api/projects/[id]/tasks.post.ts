import type { Task } from "~~/shared/types/task"
import { tasksMock } from "~~/server/utils/state"

export default defineEventHandler(async (event): Promise<Task> => {
    const projectId = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (!body?.title) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Title is required'
        })
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // For this demo, we save to our shared mock state
    const newTask: Task = {
        id: Math.floor(Math.random() * 10000),
        title: body.title
    }

    if (projectId) {
        if (!tasksMock[projectId]) {
            tasksMock[projectId] = []
        }
        tasksMock[projectId].push(newTask)
    }

    return newTask
})
