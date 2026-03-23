import 'dotenv/config';
import db from './src/config/db.js';

async function updatePermissions() {
  try {
    const result = await db.query(`
      UPDATE admins 
      SET permissions = array_append(permissions, 'manage_team') 
      WHERE username = 'admin' AND NOT ('manage_team' = ANY(permissions))
      RETURNING *
    `);
    console.log('Permissions updated:', result.rows);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

updatePermissions();
