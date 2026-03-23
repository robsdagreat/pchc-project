import 'dotenv/config';
import bcrypt from 'bcrypt';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function fixAdminPassword() {
  try {
    const password = 'admin123';
    const hash = await bcrypt.hash(password, 10);
    
    console.log(`Setting admin password to '${password}' using hash: ${hash}`);
    
    // Update the admin user
    const result = await pool.query(
      'UPDATE admins SET password_hash = $1 WHERE username = $2 RETURNING id, username',
      [hash, 'admin']
    );
    
    if (result.rows.length > 0) {
      console.log('Successfully updated admin password:', result.rows[0]);
    } else {
      console.log('Admin user not found, inserting a new one...');
      const insertResult = await pool.query(
        "INSERT INTO admins (username, password_hash, role, permissions) VALUES ('admin', $1, 'super_admin', '{\"manage_all\"}') RETURNING id, username",
        [hash]
      );
      console.log('Successfully inserted new admin user:', insertResult.rows[0]);
    }
  } catch (err) {
    console.error('Failed to fix admin password:', err);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

fixAdminPassword();
