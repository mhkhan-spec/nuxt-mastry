import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../db/schema';

let db: PostgresJsDatabase<typeof schema> | null = null;

export const useDB = (): PostgresJsDatabase<typeof schema> => {
    if (db) return db;

    const config = useRuntimeConfig();
    const connectionString = process.env.DATABASE_URL || config.databaseUrl;

    // 1. Initial configuration log
    console.log('🔌 Initializing DB connection...');

    if (!connectionString) {
        console.error('❌ DB connection failed: DATABASE_URL is undefined.');
    }

    const client = postgres(connectionString, {
        prepare: false,
        // Optional: helps debug connection issues
        onnotice: (notice) => console.log('💬 Postgres Notice:', notice)
    });

    db = drizzle(client, { schema });

    // 2. Perform a "Ping" query to verify the connection
    // We don't 'await' here to avoid blocking the hook, 
    // but we can fire it off to check status in the background.
    client`SELECT 1`.then(() => {
        console.log('✅ DB Connected Successfully');
    }).catch((err) => {
        console.error('❌ DB Connection Error:', err.message);
    });

    return db;
};