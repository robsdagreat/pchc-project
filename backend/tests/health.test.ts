import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import app from '../src/index.js';

describe('Health Check API', () => {
  it('should return 200 and success status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('ok');
  });
});
