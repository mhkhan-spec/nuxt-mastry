import { useDB } from '../../utils/db';
import { projects } from '../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const db = useDB();
    const id = getRouterParam(event, 'id');

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Project ID is required'
        });
    }

    const project = await db.query.projects.findFirst({
        where: eq(projects.id, parseInt(id)),
        with: {
            tasks: true
        }
    });

    if (!project) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Project not found'
        });
    }

    return project;
});
