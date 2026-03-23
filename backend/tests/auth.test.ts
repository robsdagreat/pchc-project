import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import request from 'supertest';
import app from '../src/index.js';
import db from '../src/config/db.js';
import bcrypt from 'bcrypt';

describe('Auth API', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('POST /api/auth/login', () => {
    it('should return 400 if username or password missing', async () => {
      const res = await request(app).post('/api/auth/login').send({});
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toMatch(/provide username and password/i);
    });

    it('should return 401 for invalid credentials', async () => {
      const dbSpy = jest.spyOn(db, 'query');
      dbSpy.mockResolvedValueOnce({ rows: [] } as any);
      
      const res = await request(app).post('/api/auth/login').send({
        username: 'wrong',
        password: 'password'
      });
      expect(res.statusCode).toEqual(401);
    });

    it('should login successfully with correct credentials', async () => {
      const dbSpy = jest.spyOn(db, 'query');
      const hashedPassword = await bcrypt.hash('correct_password', 10);
      dbSpy.mockResolvedValueOnce({
        rows: [{
          id: 1,
          username: 'admin',
          password_hash: hashedPassword,
          role: 'super_admin',
          permissions: []
        }]
      } as any);

      const res = await request(app).post('/api/auth/login').send({
        username: 'admin',
        password: 'correct_password'
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body.token).toBeDefined();
      expect(res.body.admin.username).toBe('admin');
    });
  });
});
