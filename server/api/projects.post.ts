import { useDB } from '../utils/db';
import { projects } from '../db/schema';

export default defineEventHandler(async (event) => {
    const db = useDB();
    const body = await readBody(event);

    if (!body?.name) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Name is required'
        });
    }

    const [newProject] = await db.insert(projects).values({
        name: body.name,
        description: body.description
    }).returning();

    // Invalidate the projects-list cache
    const cacheKey = 'nitro:handlers:projects-list:all.json';
    await useStorage('cache').removeItem(cacheKey);

    return newProject;
});
