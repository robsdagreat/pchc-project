import bcrypt from 'bcrypt';
import db from './src/config/db.js';

const updateAdminPassword = async () => {
  const password = 'admin123';
  const saltRounds = 10;
  
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(`Generated hash for 'admin123': ${hash}`);
    
    const result = await db.query(
      'UPDATE admins SET password_hash = $1 WHERE username = $2 RETURNING *',
      [hash, 'admin']
    );
    
    if (result.rowCount === 0) {
      console.log('Admin user not found, inserting new one...');
      await db.query(
        'INSERT INTO admins (username, password_hash, role, permissions) VALUES ($1, $2, $3, $4)',
        ['admin', hash, 'super_admin', JSON.stringify(['manage_all'])]
      );
      console.log('New admin user created successfully.');
    } else {
      console.log('Admin password updated successfully.');
    }
    
    process.exit(0);
  } catch (err) {
    console.error('Error updating admin password:', err);
    process.exit(1);
  }
};

updateAdminPassword();
