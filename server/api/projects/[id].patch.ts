import { useDB } from '../../utils/db';
import { projects } from '../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const db = useDB();
    const id = getRouterParam(event, 'id');
    const body = await readBody(event);

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Project ID is required'
        });
    }

    const [updatedProject] = await db.update(projects)
        .set({
            name: body.name,
            description: body.description
        })
        .where(eq(projects.id, parseInt(id)))
        .returning();

    if (!updatedProject) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Project not found'
        });
    }

    return updatedProject;
});
