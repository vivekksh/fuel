// backend/src/__tests__/routes.test.ts
import request from 'supertest';
import app from '../infrastructure/server/app';

describe('Routes Endpoint', () => {
  it('should fetch all routes', async () => {
    const response = await request(app).get('/api/routes');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});
