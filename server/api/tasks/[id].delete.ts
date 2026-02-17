import { useDB } from '../../utils/db';
import { tasks } from '../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const db = useDB();
    const id = getRouterParam(event, 'id');

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Task ID is required'
        });
    }

    const [deletedTask] = await db.delete(tasks)
        .where(eq(tasks.id, parseInt(id)))
        .returning();

    if (!deletedTask) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Task not found'
        });
    }

    return { message: 'Task deleted successfully' };
});
