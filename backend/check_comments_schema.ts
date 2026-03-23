import dotenv from 'dotenv';
import path from 'path';
import { Pool } from 'pg';

dotenv.config({ path: path.resolve('backend', '.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function checkCommentsSchema() {
  try {
    console.log('--- Columns ---');
    const cols = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'comments'
    `);
    console.log(cols.rows);

    console.log('--- Constraints ---');
    const constraints = await pool.query(`
      SELECT
          conname AS constraint_name,
          pg_get_constraintdef(c.oid) AS constraint_definition
      FROM
          pg_constraint c
      JOIN
          pg_namespace n ON n.oid = c.connamespace
      WHERE
          contype IN ('f', 'p', 'u')
          AND conrelid = 'comments'::regclass;
    `);
    console.log(constraints.rows);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkCommentsSchema();
