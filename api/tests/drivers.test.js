const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");

describe('Testing \'drivers\' route', () => {

  let user = null;
  let driver = null;
  let carriers = null;

  const getUser = (email, password) => {
    it('user should successfully login', async () => {
      const res = await request(app)
        .post('/users/sessions')
        .send({email, password});

      expect(res.statusCode).toBe(200);
      user = res.body;
    });
  };
  const getCarrier = async() => {
    it('should get array of all carriers', async () => {
      const res = await request(app)
        .get('/carriers')
        .set({Authorization: user.token});
      carriers = res.body
    });
  };

  const createDriver = () => {
    if (user === null) getUser('admin@gmail.com', 'admin');
    getCarrier();

    it('driver should successfully create', async () => {
      const res = await request(app)
        .post('/drivers')
        .set({Authorization: user.token})
        .send({
          email: 'user441@gmail.com',
          name: 'Luke',
          phoneNumber: '+355123456788',
          companyId: carriers[1]._id.toString(),
          status: 'upcoming',
          description: JSON.stringify({
            address: 'US, LA, Avalon c., str. 1, h. 45',
            DOB: '10.01.1989',
            info: 'Lorem ipsum dolor sit amet',
            reference: 'good boy'
          })
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.email).toBe('user441@gmail.com');
      expect(res.body.name).toBe('Luke');
      driver = res.body;
    });
  };

  describe('get all drivers', () => {
    getUser('admin@gmail.com', 'admin');

    it('should get array of all drivers', async () => {
      const res = await request(app)
        .get('/drivers')
        .set({Authorization: user.token});
      // console.log(res.body);
      expect(res.statusCode).toBe(200);
    });
  });

  describe('create a new driver', () => {
    createDriver();
  });


  describe('get all drivers of carrier', () => {
    getUser('bahaway@gmail.com', 'bahaway');

    it('should get array of all drivers', async () => {
      const res = await request(app)
        .get('/drivers/carrier')
        .set({Authorization: user.token});
      expect(res.statusCode).toBe(200);
    });
  });


  describe('get driver by id', () => {
    getUser('admin@gmail.com', 'admin');

    it('should get driver data', async () => {
      const res = await request(app)
        .get('/drivers/' + driver._id.toString())
        .set({Authorization: user.token});

      expect(res.statusCode).toBe(200);
    });
  });

  describe('get all drivers of carrier', () => {
    if (user === null) getUser('bahaway@gmail.com', 'bahaway');
    getCarrier();

    it('driver should successfully create', async () => {
      const res = await request(app)
        .post('/drivers/carrier')
        .set({Authorization: user.token})
        .send({
          email: 'user555@gmail.com',
          name: 'John',
          phoneNumber: '+355123456777',
          companyId: carriers[0]._id.toString(),
          status: 'upcoming',
          description: JSON.stringify({
            address: 'US, NY, Manhattan c., str. 1, h. 34',
            DOB: '15.12.1988',
            info: 'Lorem ipsum dolor sit amet',
            reference: 'reliable'
          })
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.email).toBe('user555@gmail.com');
      expect(res.body.name).toBe('John');
      driver = res.body;
    });
  });

  describe('changing driver data', () => {
    it('should edit driver', async () => {
      const res = await request(app)
        .put('/drivers/' + driver._id.toString())
        .set({Authorization: user.token})
        .send({
          email: 'askhat555@gmail.com',
          name: 'Jack',
          phoneNumber: '+355973456777',
          companyId: carriers[2]._id.toString(),
          status: 'upcoming',
          description: JSON.stringify({
            address: 'US, NY, Manhattan c., str. 1, h. 34',
            DOB: '15.12.1988',
            info: 'Lorem ipsum dolor sit amet',
            reference: 'reliable'
          })
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.phoneNumber).toBe('+355973456777');
      expect(res.body.name).toBe('Jack');
    });
  });


  describe('changing driver data by Carrier', () => {
    getUser('bahaway@gmail.com', 'bahaway');
    it('should edit driver by Carrier', async () => {
      const res = await request(app)
        .put('/drivers/' + driver._id.toString())
        .set({Authorization: user.token})
        .send({
          email: 'askhat999@gmail.com',
          name: 'Kevin',
          phoneNumber: '+355973459977',
          companyId: carriers[2]._id.toString(),
          status: 'upcoming',
          description: JSON.stringify({
            address: 'US, NY, Manhattan c., str. 1, h. 34',
            DOB: '15.12.1988',
            info: 'Lorem ipsum dolor sit amet',
            reference: 'reliable'
          })
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.phoneNumber).toBe('+355973459977');
      expect(res.body.name).toBe('Kevin');
    });
  });

});

afterAll(() => mongoose.disconnect());
