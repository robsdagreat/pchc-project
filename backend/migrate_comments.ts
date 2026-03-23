import dotenv from 'dotenv';
import path from 'path';
import { Pool } from 'pg';

dotenv.config({ path: path.resolve('backend', '.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function migrateComments() {
  try {
    console.log('--- Dropping existing constraint ---');
    await pool.query('ALTER TABLE comments DROP CONSTRAINT IF EXISTS comments_parent_id_fkey');
    
    console.log('--- Adding new constraint with ON DELETE CASCADE ---');
    await pool.query('ALTER TABLE comments ADD CONSTRAINT comments_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE');
    
    console.log('Migration successful!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrateComments();
