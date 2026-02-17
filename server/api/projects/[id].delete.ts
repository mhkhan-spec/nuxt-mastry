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

    const [deletedProject] = await db.delete(projects)
        .where(eq(projects.id, parseInt(id)))
        .returning();

    if (!deletedProject) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Project not found'
        });
    }

    return { message: 'Project deleted successfully' };
});
