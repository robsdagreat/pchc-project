import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const fixTitle = async () => {
  try {
    const result = await pool.query(
      "UPDATE home_content SET title = 'Together' WHERE section_name = 'impact' RETURNING *"
    );
    console.log('Title fixed successfully:', result.rows[0]);
  } catch (err) {
    console.error('Fix failed:', err);
  } finally {
    await pool.end();
  }
};

fixTitle();
