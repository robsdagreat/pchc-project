import 'dotenv/config';
import db from './src/config/db.js';

async function check() {
  try {
    const result = await db.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'comments'");
    console.log('Comments table columns:', result.rows);
    
    const sample = await db.query("SELECT * FROM comments LIMIT 5");
    console.log('Sample comments data:', JSON.stringify(sample.rows, null, 2));
    
    process.exit(0);
  } catch (err) {
    console.error('Check failed:', err);
    process.exit(1);
  }
}

check();
