const supertest = require('supertest');
const app = require('../app');
const agent = supertest(app);

describe('GET /session', () => {
  //   beforeEach(() => {
  //     agent.get('/api/v1/session').expect(400).end();
  //   });
  describe('when session query params missing', () => {
    it('should return a 404', async () => {
      const response = await agent.get('/api/v1/session');

      expect(response.statusCode).toBe(400);
    });
  });
});
