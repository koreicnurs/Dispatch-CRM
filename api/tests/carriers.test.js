const mongoose = require('mongoose');
const request = require('supertest');
const app = require("../index");

describe('Testing \'carriers\' route', () => {

  let user = null;
  let carrier = null;

  const getUser = (email, password) => {
    it('user should successfully login', async () => {
      const res = await request(app)
        .post('/users/sessions')
        .send({email, password});

      expect(res.statusCode).toBe(200);
      user = res.body;
    });
  };


  const createCarrier = () => {
    if (user === null) getUser('admin@gmail.com', 'admin');

    it('carrier should successfully create', async () => {
      const res = await request(app)
        .post('/carriers')
        .set({Authorization: user.token})
        .send({
          title: 'Test Carrier',
          mc: '11111',
          dot: '22222',
          fedid: '33333',
          phoneNumber: '+355123456788',
          description: 'test'
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('Test Carrier');
      expect(res.body.mc).toBe('11111');
      carrier = res.body;
    });
  };



  describe('get all carriers', () => {
    getUser('admin@gmail.com', 'admin');

    it('should get array of all carriers', async () => {
      const res = await request(app)
        .get('/carriers')
        .set({Authorization: user.token});
      expect(res.statusCode).toBe(200);
    });
  });

  describe('create a new carrier', () => {
    createCarrier();
  });



  describe('change carrier', () => {
    it('carrier should successfully change', async () => {
      const res = await request(app)
        .put('/carriers/' + carrier._id.toString())
        .set({Authorization: user.token})
        .send({
          title: 'Test Carrier Changed',
          mc: '11111',
          dot: '22222',
          fedid: '33333',
          phoneNumber: '+355123456788',
          description: 'test changed'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('Test Carrier Changed');
      expect(res.body.description).toBe('test changed');
    });
  });



  describe('get carrier by id', () => {
    it('carrier should be found by id', async () => {
      const res = await request(app)
        .get('/carriers/' + carrier._id.toString())
        .set({Authorization: user.token});

      expect(res.statusCode).toBe(200);
    });
  });

});

afterAll(() => mongoose.disconnect());



