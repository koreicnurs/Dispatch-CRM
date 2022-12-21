const mongoose = require('mongoose');
const request = require('supertest');
const app = require("../index");

describe('Testing \'learningCategories\' route', () => {
  let user = null;
  let learningCategory = null;

  const getUser = (email, password) => {
    it('should successfully login user', async () => {
      const res = await request(app)
        .post('/users/sessions')
        .send({email, password});

      expect(res.statusCode).toBe(200);
      user = res.body;
    });
  };

  describe('create a new learning category', () => {
    if (user === null) getUser('admin@gmail.com', 'admin');

    it('should successfully create learning category', async () => {
      const res = await request(app)
        .post('/learningCategories')
        .set({Authorization: user.token})
        .send({title: 'Test learning category title'});
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('Test learning category title');
      learningCategory = res.body;
    });
  });

  describe('receiving all learning categories', () => {
    getUser('admin@gmail.com', 'admin');

    it('should return an array of all learning categories', async () => {
      const res = await request(app)
        .get('/learningCategories')
        .set({Authorization: user.token});
      expect(res.statusCode).toBe(200);
    });
  });
});

afterAll(() => mongoose.disconnect());
