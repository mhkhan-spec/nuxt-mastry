import { useDB } from '../utils/db';

export default defineEventHandler(async (event) => {
    const db = useDB(); // Now explicitly imported

    // Fully type-safe query
    const allProjects = await db.query.projects.findMany({
        with: {
            tasks: true // If you set up relations
        }
    });

    return allProjects;
});