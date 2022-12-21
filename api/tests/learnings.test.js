const mongoose = require('mongoose');
const request = require('supertest');
const app = require("../index");

describe('Testing \'learnings\' route', () => {

  let user = null;
  let learning = null;

  const getUser = (email, password) => {
    it('user should successfully login', async () => {
      const res = await request(app)
        .post('/users/sessions')
        .send({email, password});

      expect(res.statusCode).toBe(200);
      user = res.body;
    });
  };

  const createLearning = () => {
    if (user === null) getUser('admin@gmail.com', 'admin');

    it('should successfully create learning', async () => {
      const res = await request(app)
        .post('/learnings')
        .set({Authorization: user.token})
        .send({
          title: 'Test learning title',
          description: 'Test learning description',
          text: 'Test learning text'
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('Test learning title');
      expect(res.body.description).toBe('Test learning description');
      expect(res.body.text).toBe('Test learning text');
      learning = res.body;
    });
  };

  describe('getting of all learnings', () => {
    getUser('user@gmail.com', 'user');

    it('should get array of all learnings', async () => {
      const res = await request(app)
        .get('/learnings')
        .set({Authorization: user.token});
      expect(res.statusCode).toBe(200);
    });
  });

  describe('create a new learning', () => {
    createLearning();
  });

  describe('change learning', () => {
    if (learning === null) createLearning();

    it('learning should successfully change', async () => {
      const res = await request(app)
        .put('/learnings/' + learning._id.toString())
        .set({Authorization: user.token})
        .send({
          title: 'Changed test learning title',
          description: 'Changed test learning description'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body[0].title).toBe('Changed test learning title');
      expect(res.body[0].description).toBe('Changed test learning description');
    });
  });

  describe('delete learning', () => {
    getUser('admin@gmail.com', 'admin');
    if (learning === null) createLearning();

    it('learning should successfully deleted', async () => {
      const res = await request(app)
        .delete('/learnings/' + learning._id.toString())
        .set({Authorization: user.token});

      expect(res.statusCode).toBe(200);
    });
  });

});

afterAll(() => mongoose.disconnect());
