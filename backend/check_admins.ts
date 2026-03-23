import 'dotenv/config';
import db from './src/config/db.js';

async function checkAdmins() {
  try {
    const result = await db.query('SELECT id, username, password_hash FROM admins');
    console.log('Admins in DB:', result.rows);
    process.exit(0);
  } catch (err) {
    console.error('Error checking admins:', err);
    process.exit(1);
  }
}

checkAdmins();
