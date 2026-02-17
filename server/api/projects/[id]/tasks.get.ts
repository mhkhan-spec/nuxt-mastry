import { useDB } from '../../../utils/db';
import { tasks } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const projectId = getRouterParam(event, 'id');
    const db = useDB();

    if (!projectId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Project ID is required'
        });
    }

    const projectTasks = await db.query.tasks.findMany({
        where: eq(tasks.projectId, parseInt(projectId))
    });

    return projectTasks;
});
