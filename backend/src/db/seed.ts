import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../config/db.js';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const seed = async () => {
  const seedPath = path.join(__dirname, '../../seed.sql');
  
  try {
    logger.info('Starting database seeding...');
    
    if (!fs.existsSync(seedPath)) {
      throw new Error(`Seed file not found at ${seedPath}`);
    }

    const sql = fs.readFileSync(seedPath, 'utf8');
    
    // Execute the seed SQL
    await db.query(sql);
    
    logger.info('Database seeded successfully');
    process.exit(0);
  } catch (err) {
    logger.error(`Seeding failed: ${err}`);
    process.exit(1);
  }
};

// Run seed if this script is executed directly
if (import.meta.url === `file:///${__filename.replace(/\\/g, '/')}`) {
  seed();
}
