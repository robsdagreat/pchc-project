import { jest } from '@jest/globals';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret';
process.env.NODE_ENV = 'test';

// Simple mock for pg Pool.query
export const mockDb = {
  query: jest.fn<(query: string, values?: any[]) => Promise<any>>(),
};

jest.mock('../src/config/db.js', () => ({
  default: mockDb,
  __esModule: true
}));
