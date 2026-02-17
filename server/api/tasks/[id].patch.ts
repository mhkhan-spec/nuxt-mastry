import { useDB } from '../../utils/db';
import { tasks } from '../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const db = useDB();
    const id = getRouterParam(event, 'id');
    const body = await readBody(event);

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Task ID is required'
        });
    }

    const [updatedTask] = await db.update(tasks)
        .set({
            title: body.title,
            status: body.status
        })
        .where(eq(tasks.id, parseInt(id)))
        .returning();

    if (!updatedTask) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Task not found'
        });
    }

    return updatedTask;
});
