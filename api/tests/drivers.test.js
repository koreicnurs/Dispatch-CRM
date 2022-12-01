const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
describe('Testing \'drivers\' route', () => {

  let user = null;
  let driver = null;

  const getUser = (email, password) => {
    it('user should successfully login', async () => {
      const res = await request(app)
        .post('/users/sessions')
        .send({email, password});

      expect(res.statusCode).toBe(200);
      user = res.body;
    });
  };




  const createDriver = () => {
    if (user === null) getUser('admin@gmail.com', 'admin');

    it('driver should successfully create', async () => {
      const res = await request(app)
        .post('/drivers')
        .set({Authorization: user.token})
        .send({
          email: 'sfdjhsjdfhj@gmail.com',
          name: 'Luke',
          phoneNumber: '+355123456788',
          companyId: '638811e9057be8ef9bd8c447',
          status: 'upcoming',
          description: JSON.stringify({
            address: 'US, LA, Avalon c., str. 1, h. 45',
            DOB: '10.01.1989',
            info: 'Lorem ipsum dolor sit amet',
            reference: 'good boy'
          })
        });
      console.log(res.statusCode)
      console.log(res.body)

      expect(res.statusCode).toBe(200);
      // expect(res.body.email).toBe('user10@gmail.com');
      // expect(res.body.name).toBe('Luke');
      driver = res.body;
    });
  };



  // describe('get all carriers', () => {
  //   getUser('admin@gmail.com', 'admin');
  //
  //   it('should get array of all carriers', async () => {
  //     const res = await request(app)
  //       .get('/carriers')
  //       .set({Authorization: user.token});
  //     expect(res.statusCode).toBe(200);
  //   });
  // });

  describe('create a new driver', () => {
    createDriver();
  });
  //
  //
  //
  // describe('change carrier', () => {
  //   it('carrier should successfully change', async () => {
  //     const res = await request(app)
  //       .put('/carriers/' + carrier._id.toString())
  //       .set({Authorization: user.token})
  //       .send({
  //         title: 'Test Carrier Changed',
  //         mc: '11111',
  //         dot: '22222',
  //         fedid: '33333',
  //         phoneNumber: '+355123456788',
  //         description: 'test changed'
  //       });
  //
  //     expect(res.statusCode).toBe(200);
  //     expect(res.body.title).toBe('Test Carrier Changed');
  //     expect(res.body.description).toBe('test changed');
  //   });
  // });
  //
  //
  //
  // describe('get carrier by id', () => {
  //   it('carrier should be found by id', async () => {
  //     const res = await request(app)
  //       .get('/carriers/' + carrier._id.toString())
  //       .set({Authorization: user.token});
  //
  //     expect(res.statusCode).toBe(200);
  //   });
  // });

});

afterAll(() => mongoose.disconnect());
