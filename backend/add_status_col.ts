import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function addStatusColumn() {
  try {
    await pool.query(`
      ALTER TABLE contact_messages 
      ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'unread'
    `);
    console.log('Successfully added status column');
    process.exit(0);
  } catch (err) {
    console.error('Failed to add status column:', err);
    process.exit(1);
  }
}

addStatusColumn();
