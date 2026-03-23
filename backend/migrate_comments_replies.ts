import 'dotenv/config';
import db from './src/config/db.js';

async function migrate() {
  try {
    // Add parent_id column for threaded comments
    await db.query(`
      ALTER TABLE comments 
      ADD COLUMN IF NOT EXISTS parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE
    `);
    console.log('Migration successful: Added parent_id to comments table.');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
