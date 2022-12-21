const mongoose = require('mongoose');
const request = require('supertest');
const app = require("../index");

describe('Testing \'learnings\' route', () => {
  let user = null;
  let learning = null;
  let learningCategories = null;

  const getUser = (email, password) => {
    it('user should successfully login', async () => {
      const res = await request(app)
        .post('/users/sessions')
        .send({email, password});

      expect(res.statusCode).toBe(200);
      user = res.body;
    });
  };

  const getLearningCategories = () => {
    it('should return an array of all learning categories', async () => {
      const res = await request(app)
        .get('/learningCategories')
        .set({Authorization: user.token});
      learningCategories = res.body;
    });
  };

  const createLearning = () => {
    if (user === null) getUser('admin@gmail.com', 'admin');
    getLearningCategories();

    it('should successfully create learning', async () => {
      const res = await request(app)
        .post('/learnings')
        .set({Authorization: user.token})
        .send({
          title: 'Test learning title',
          description: 'Test learning description',
          text: 'Test learning text',
          learningCategory: learningCategories[0]._id
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('Test learning title');
      expect(res.body.description).toBe('Test learning description');
      expect(res.body.text).toBe('Test learning text');
      expect(res.body.learningCategory).toBe(learningCategories[0]._id.toString());
      learning = res.body;
    });
  };

  describe('receiving all learnings of one category', () => {
    getUser('admin@gmail.com', 'admin');
    getLearningCategories();

    it('should get array of all learnings of one category', async () => {
      const res = await request(app)
        .get('/learnings?category=' + learningCategories[0]._id.toString())
        .set({Authorization: user.token});
      expect(res.statusCode).toBe(200);
    });
  });

  describe('create a new learning', () => {
    createLearning();
  });

  describe('get learning by id', () => {
    getUser('admin@gmail.com', 'admin');
    it('should find and return learning by id', async () => {
      const res = await request(app)
        .get('/learnings/' + learning._id.toString())
        .set({Authorization: user.token});

      expect(res.statusCode).toBe(200);
    });
  });

  describe('add comment to learning', () => {
    getUser('admin@gmail.com', 'admin');
    it('should add comment to learning', async () => {
      const res = await request(app)
        .post('/learnings/comment/' + learning._id.toString())
        .set({Authorization: user.token})
        .send({
          text: 'Test learning comment text'
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.comment[res.body.comment.length-1].text)
        .toBe('Test learning comment text');
      expect(res.body.comment[res.body.comment.length-1].authorId)
        .toBe(user._id.toString());
    });
  });

  describe('change learning', () => {
    if (learning === null) createLearning();
    getLearningCategories();

    it('should successfully edit learning', async () => {
      const res = await request(app)
        .put('/learnings/' + learning._id.toString())
        .set({Authorization: user.token})
        .send({
          title: 'Changed test learning title',
          description: 'Changed test learning description',
          text: 'Changed test learning text',
          learningCategory: learningCategories[0]._id
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('Changed test learning title');
      expect(res.body.description).toBe('Changed test learning description');
      expect(res.body.text).toBe('Changed test learning text');
      expect(res.body.learningCategory).toBe(learningCategories[0]._id.toString());
    });
  });

  describe('delete learning', () => {
    getUser('admin@gmail.com', 'admin');
    if (learning === null) createLearning();

    it('should successfully delete learning', async () => {
      const res = await request(app)
        .delete('/learnings/' + learning._id.toString())
        .set({Authorization: user.token});

      expect(res.statusCode).toBe(200);
    });
  });

});

afterAll(() => mongoose.disconnect());
