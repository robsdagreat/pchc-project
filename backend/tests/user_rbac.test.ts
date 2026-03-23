import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import request from 'supertest';
import app from '../src/index.js';
import db from '../src/config/db.js';
import jwt from 'jsonwebtoken';

const superAdminToken = jwt.sign(
  { id: 1, username: 'superadmin', role: 'super_admin', permissions: [] },
  process.env.JWT_SECRET || 'test_secret'
);

const adminToken = jwt.sign(
  { id: 2, username: 'admin', role: 'admin', permissions: [] },
  process.env.JWT_SECRET || 'test_secret'
);

describe('User Management API (RBAC)', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET /api/users', () => {
    it('should deny access to non-superadmin', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toEqual(403);
    });

    it('should allow access to superadmin', async () => {
      const dbSpy = jest.spyOn(db, 'query');
      dbSpy.mockResolvedValueOnce({ rows: [{ id: 1, username: 'admin1' }] } as any);
      
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${superAdminToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.users).toBeDefined();
    });
  });
});
