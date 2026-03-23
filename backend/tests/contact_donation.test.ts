import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import request from 'supertest';
import app from '../src/index.js';
import db from '../src/config/db.js';

describe('Contact & Donation API', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('POST /api/contact', () => {
    it('should submit a contact message', async () => {
      const dbSpy = jest.spyOn(db, 'query');
      dbSpy.mockResolvedValueOnce({ rows: [{ id: 1, name: 'John' }] } as any);
      
      const res = await request(app).post('/api/contact').send({
        name: 'John',
        email: 'john@example.com',
        message: 'Hello'
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body.status).toBe('success');
    });
  });

  describe('GET /api/donations/tiers', () => {
    it('should fetch donation tiers', async () => {
      const dbSpy = jest.spyOn(db, 'query');
      dbSpy.mockResolvedValueOnce({ rows: [{ id: 1, name: 'Tier 1' }] } as any);
      
      const res = await request(app).get('/api/donations/tiers');
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.tiers).toHaveLength(1);
    });
  });
});
