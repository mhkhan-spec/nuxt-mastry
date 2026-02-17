import { useDB } from '../../../utils/db';
import { tasks } from '../../../db/schema';

export default defineEventHandler(async (event) => {
    const projectId = getRouterParam(event, 'id');
    const body = await readBody(event);
    const db = useDB();

    if (!projectId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Project ID is required'
        });
    }

    if (!body?.title) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Title is required'
        });
    }

    const [newTask] = await db.insert(tasks).values({
        projectId: parseInt(projectId),
        title: body.title,
        status: body.status || 'todo'
    }).returning();

    return newTask;
});
