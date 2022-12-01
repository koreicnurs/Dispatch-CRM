const mongoose = require('mongoose');
const request = require('supertest');
const app = require("../index");

describe('Testing \'brokers\' route', () => {
  let user;
  let broker;

  const getUser = (email, password) => {
    it('should login user', async () => {
      const res = await request(app)
        .post('/users/sessions')
        .send({email, password});

      expect(res.statusCode).toBe(200);
      user = res.body;
    });
  };

  const createBroker = () => {
    if (!user) getUser('user@gmail.com', 'user');

    it('should create broker', async () => {
      const res = await request(app)
        .post('/brokers')
        .set({Authorization: user.token})
        .send({
          name: 'Test broker title',
          phoneNumber: '+99655555000',
          mc: 'Test broker mc',
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('Test broker title');
      expect(res.body.mc).toBe('Test broker mc');
      broker = res.body;
    });
  };

  describe('getting of all brokers', () => {
    getUser('user@gmail.com', 'user');

    it('should return an array of all brokers', async () => {
      const res = await request(app)
        .get('/brokers')
        .set({Authorization: user.token});
      expect(res.statusCode).toBe(200);
    });
  });

  describe('create a new broker', () => {
    createBroker();
  });

  describe('edit broker', () => {
    if (!broker) createBroker();

    it('should edit broker', async () => {
      const res = await request(app)
        .put('/brokers/' + broker._id.toString())
        .set({Authorization: user.token})
        .send({
          name: 'Changed test broker name',
          phoneNumber: '+99655555001',
          mc: 'Changed Test broker mc',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('Changed test broker name');
      expect(res.body.mc).toBe('Changed Test broker mc');
    });
  });

  describe('delete broker', () => {
    if (!broker) createBroker();

    it('should delete broker', async () => {
      const res = await request(app)
        .delete('/brokers/' + broker._id.toString())
        .set({Authorization: user.token});

      expect(res.statusCode).toBe(200);
    });
  });

});

afterAll(() => mongoose.disconnect());
