import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../config/db.js';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const migrate = async () => {
  const schemaPath = path.join(__dirname, '../../schema.sql');
  
  try {
    logger.info('Starting database migration...');
    
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`Schema file not found at ${schemaPath}`);
    }

    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split schema into individual statements if necessary, 
    // or just execute the whole block if the driver supports it.
    // pg's pool.query can execute multiple semicolon-separated statements.
    await db.query(schema);
    
    logger.info('Database schema initialized successfully');
    process.exit(0);
  } catch (err) {
    logger.error(`Migration failed: ${err}`);
    process.exit(1);
  }
};

// Run migration if this script is executed directly
if (import.meta.url === `file:///${__filename.replace(/\\/g, '/')}`) {
  migrate();
}
