import { useDB } from '../utils/db';

export default defineCachedEventHandler(async (event) => {
    const db = useDB();

    console.log('--- Cache Miss: Querying Postgres ---');

    // Fully type-safe query
    const allProjects = await db.query.projects.findMany({
        with: {
            tasks: true
        }
    });

    return allProjects;
}, {
    maxAge: 60,
    swr: true,
    name: 'projects-list',
    getKey: (event) => 'all'
});