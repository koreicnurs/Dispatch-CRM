const mongoose = require('mongoose');
const request = require('supertest');
const app = require("../index");

let uniqueTitle = new Date().valueOf().toString().slice(9)*1;
let uniqueMC = new Date().valueOf().toString().slice(5)*1;
let uniqueDOT = new Date().valueOf().toString().slice(7)*1;
let uniqueFedID = new Date().valueOf().toString().slice(6)*1;
let uniquePhoneNumber = new Date().valueOf().toString().slice(2)*1;

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
          title: uniqueTitle,
          mc: uniqueMC,
          dot: uniqueDOT,
          fedid: uniqueFedID,
          description: 'test',
          phoneNumber: `+3${uniquePhoneNumber}`,
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe(uniqueTitle.toString());
      expect(res.body.phoneNumber).toBe(`+3${uniquePhoneNumber.toString()}`);
      carrier = res.body;
    });
  };


  describe('create a new carrier', () => {
    createCarrier();
  });

  describe('get all carriers', () => {
    getUser('admin@gmail.com', 'admin');

    it('should get array of all carriers', async () => {
      const res = await request(app)
        .get('/carriers')
        .set({Authorization: user.token});
      expect(res.statusCode).toBe(200);
    });
  });



  describe('edit carrier data', () => {
    getUser('admin@gmail.com', 'admin');

    it('carrier should successfully change', async () => {
      const res1 = await request(app)
        .get('/carriers')
        .set({Authorization: user.token});
      let carriers = res1.body;
      const res = await request(app)
        .put('/carriers/' + carriers[0]._id.toString())
        .set({Authorization: user.token})
        .send({
          title: 'Test Carrier Changed',
          mc: '11111',
          dot: '22222',
          fedid: '33333',
          description: 'test changed',
          phoneNumber: '+355123456788',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('Test Carrier Changed');
      expect(res.body.description).toBe('test changed');
    });
  });



  describe('get carrier by id', () => {
    getUser('admin@gmail.com', 'admin');
    it('carrier should be found by id', async () => {
      const res1 = await request(app)
        .get('/carriers')
        .set({Authorization: user.token});
      let carriers = res1.body;
      const res = await request(app)
        .get('/carriers/' + carriers[0]._id.toString())
        .set({Authorization: user.token});

      expect(res.statusCode).toBe(200);
    });
  });

});

afterAll(() => mongoose.disconnect());



