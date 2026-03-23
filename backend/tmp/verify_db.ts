import 'dotenv/config';
import db from '../src/config/db.js';

const verify = async () => {
  try {
    const tables = [
      'admins', 'blogs', 'team_members', 'donation_tiers', 
      'home_content', 'gallery', 'comments', 'contact_messages'
    ];

    console.log('--- Database Seed Verification ---');
    for (const table of tables) {
      const result = await db.query(`SELECT COUNT(*) FROM ${table}`);
      console.log(`${table.padEnd(20)}: ${result.rows[0].count} rows`);
    }

    console.log('\nSample Blog Titles:');
    const blogs = await db.query('SELECT title FROM blogs LIMIT 2');
    blogs.rows.forEach(b => console.log(`- ${b.title}`));

    process.exit(0);
  } catch (err) {
    console.error('Verification failed:', err);
    process.exit(1);
  }
};

verify();
