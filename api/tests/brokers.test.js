const mongoose = require('mongoose');
const request = require('supertest');
const app = require("../index");

describe('Testing \'brokers\' route', () => {
  let user = null;
  let broker = null;
  let carriers = null;

  const getUser = (email, password) => {
    it('should login user', async () => {
      const res = await request(app)
        .post('/users/sessions')
        .send({email, password});

      expect(res.statusCode).toBe(200);
      user = res.body;
    });
  };

  const getCarriers = () => {
    it('should return an array of all carriers', async () => {
      const res = await request(app)
        .get('/carriers')
        .set({Authorization: user.token});
      carriers = res.body;
    });
  };

  const createBroker = () => {
    if (user === null) getUser('user@gmail.com', 'user');
    if (carriers === null) getCarriers();

    it('should create broker', async () => {
      const res = await request(app)
        .post('/brokers')
        .set({Authorization: user.token})
        .send({
          name: 'Test broker name',
          phoneNumber: '+99655555000',
          mc: 'Test broker mc',
          description: 'Test broker description',
          companiesContract: carriers[0]._id.toString()
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('Test broker name');
      expect(res.body.phoneNumber).toEqual(['+99655555000']);
      expect(res.body.mc).toBe('Test broker mc');
      expect(res.body.description).toBe('Test broker description');
      expect(res.body.companiesContract).toEqual([carriers[0]._id.toString()]);
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
    if (broker === null) createBroker();
    it('should edit broker', async () => {
      const res = await request(app)
        .put('/brokers/' + broker._id.toString())
        .set({Authorization: user.token})
        .send({
          name: 'Changed test broker name',
          phoneNumber: '+99655555001',
          mc: 'Changed Test broker mc',
          description: 'Changed Test broker description',
          companiesContract: carriers[1]._id.toString()
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('Changed test broker name');
      expect(res.body.phoneNumber).toEqual(['+99655555001']);
      expect(res.body.mc).toBe('Changed Test broker mc');
      expect(res.body.description).toBe('Changed Test broker description');
      expect(res.body.companiesContract).toEqual([carriers[1]._id.toString()]);
    });
  });

  describe('delete broker', () => {
    if (broker === null) createBroker();

    it('should delete broker', async () => {
      const res = await request(app)
        .delete('/brokers/' + broker._id.toString())
        .set({Authorization: user.token});

      expect(res.statusCode).toBe(200);
    });
  });

});

afterAll(() => mongoose.disconnect());
