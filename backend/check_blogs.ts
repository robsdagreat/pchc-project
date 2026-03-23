import 'dotenv/config';
import db from './src/config/db.js';

async function checkBlogs() {
  try {
    const result = await db.query('SELECT id, title, content FROM blogs');
    console.log('Blog Data:');
    console.log(JSON.stringify(result.rows, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error fetching blogs:', err);
    process.exit(1);
  }
}

checkBlogs();
