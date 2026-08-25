import { Pool } from 'pg';
import { databaseConfig } from '../config/environment';

/**
 * PostgreSQL connection pool
 * This is a singleton instance shared across the application
 */
export const pool = new Pool(databaseConfig);

/**
 * Handle pool errors
 */
pool.on('error', (err: Error) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

/**
 * Close the database pool
 * Should be called during graceful shutdown
 */
export async function closePool(): Promise<void> {
  await pool.end();
  console.log('Database pool closed');
}
