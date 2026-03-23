import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import request from 'supertest';
import app from '../src/index.js';
import db from '../src/config/db.js';
import jwt from 'jsonwebtoken';

const mockToken = jwt.sign(
  { id: 1, username: 'admin', role: 'admin', permissions: ['manage_blogs'] },
  process.env.JWT_SECRET || 'test_secret'
);

describe('Blog API', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET /api/blogs', () => {
    it('should fetch all blogs', async () => {
      const dbSpy = jest.spyOn(db, 'query');
      dbSpy.mockResolvedValueOnce({ rows: [{ id: 1, title: 'Test Blog' }] } as any);
      
      const res = await request(app).get('/api/blogs');
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.blogs).toHaveLength(1);
    });
  });

  describe('POST /api/blogs', () => {
    it('should fail without token', async () => {
      const res = await request(app).post('/api/blogs').send({ title: 'New' });
      expect(res.statusCode).toEqual(401);
    });

    it('should create blog with valid token and permission', async () => {
       const dbSpy = jest.spyOn(db, 'query');
       dbSpy.mockResolvedValueOnce({ rows: [{ id: 2, title: 'Authorized Blog' }] } as any);
       
       const res = await request(app)
        .post('/api/blogs')
        .set('Authorization', `Bearer ${mockToken}`)
        .send({ title: 'Authorized Blog', content: 'Content' });
       
       expect(res.statusCode).toEqual(201);
    });
  });
});
