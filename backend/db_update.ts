import 'dotenv/config';
import db from './src/config/db.js';

async function update() {
  try {
    const urls = [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800',
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800'
    ];

    for (let i = 0; i < urls.length; i++) {
      await db.query('UPDATE blogs SET media_url = $1 WHERE id = $2', [urls[i], i + 1]);
    }

    console.log('Database updated successfully with new Unsplash URLs');
    process.exit(0);
  } catch (err) {
    console.error('Error updating database:', err);
    process.exit(1);
  }
}

update();
