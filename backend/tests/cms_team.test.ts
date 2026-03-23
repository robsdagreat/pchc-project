import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import request from 'supertest';
import app from '../src/index.js';
import db from '../src/config/db.js';

describe('CMS & Team API', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET /api/content/homepage', () => {
    it('should fetch unified homepage content', async () => {
      const dbSpy = jest.spyOn(db, 'query');
      // Mock 8 queries: 6 sections + blogs + team
      for (let i = 0; i < 6; i++) {
        dbSpy.mockResolvedValueOnce({ rows: [{ section_name: 'test', title: 'Welcome' }] } as any);
      }
      dbSpy.mockResolvedValueOnce({ rows: [{ id: 1, title: 'Blog' }] } as any); // stories
      dbSpy.mockResolvedValueOnce({ rows: [{ id: 1, name: 'Member' }] } as any); // team
      
      const res = await request(app).get('/api/content/homepage');
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.hero).toBeDefined();
      expect(res.body.data.stories).toHaveLength(1);
    });
  });

  describe('GET /api/team', () => {
    it('should fetch team members', async () => {
      const dbSpy = jest.spyOn(db, 'query');
      dbSpy.mockResolvedValueOnce({ rows: [{ id: 1, name: 'Alice' }] } as any);
      
      const res = await request(app).get('/api/team');
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.team).toHaveLength(1);
    });
  });
});
