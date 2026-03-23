import 'dotenv/config';
import db from './src/config/db.js';

async function check() {
  try {
    const table = 'comments';
    const res = await db.query(`SELECT column_name FROM information_schema.columns WHERE table_name = $1`, [table]);
    console.log(`Columns for ${table}:`, res.rows.map(r => r.column_name));
    
    const rows = await db.query(`SELECT * FROM ${table} ORDER BY created_at DESC LIMIT 5`);
    console.log('Last 5 comments:', rows.rows);
    
    process.exit(0);
  } catch (err) {
    console.error('Check failed:', err);
    process.exit(1);
  }
}

check();
