import { Pool } from 'pg';
import logger from '../utils/logger.js';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Neon requires SSL
});

pool.on('error', (err) => {
  logger.error('Unexpected error on idle database client', err);
  process.exit(-1);
});

export const testConnection = async () => {
  try {
    const client = await pool.connect();
    logger.info('PostgreSQL connected');
    client.release();
  } catch (err) {
    logger.error(`Database connection error: ${err}`);
    process.exit(1);
  }
};

export default {
  query: (text: string, params?: any[]) => pool.query(text, params),
  pool,
};
