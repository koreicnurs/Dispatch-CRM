const mongoose = require('mongoose');
const request = require('supertest');
const app = require("../index");

const TRIPS_STATUSES = ['upcoming', 'transit', 'finished'];

describe('Testing \'loads\' route', () => {
  let user = null;
  let drivers;
  let load = null;

  const getUser = (email, password) => {
    it('user should successfully login', async () => {
      const res = await request(app)
        .post('/users/sessions')
        .send({email, password});

      expect(res.statusCode).toBe(200);
      user = res.body;
    });
  };

  const getDriver = async() => {
    it('should get array of all drivers', async () => {
      const res = await request(app)
        .get('/drivers')
        .set({Authorization: user.token});
      drivers = res.body;
    });
  };

  const createLoad = () => {
    if (user === null) getUser('user@gmail.com', 'user');
    getDriver();

    it('load should successfully create', async () => {
      const res = await request(app)
        .post('/loads')
        .set({Authorization: user.token})
        .send({
          loadCode: "T-3K17LSM9",
          driverId: drivers[0]._id.toString(),
          dispatchId: user._id,
          price: 2400,
          miles: 800,
          rpm: 3,
          datePU: "12/10/2022",
          dateDEL: "12/18/2022",
          timeToPU: "10:30",
          timeToDel: "05:00",
          pu: "Pitasdtsburg, PA",
          del: "Bosadton, MA",
          comment: "test comment",
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.loadCode).toBe('T-3K17LSM9');
      expect(res.body.status).toBe('upcoming');
      load = res.body;
    });
  };

  describe('getting of all loads with statuses', () => {
    getUser('user@gmail.com', 'user');

    TRIPS_STATUSES.forEach(status => {
      it('should get array of all loads with all statuses', async () => {
        const res = await request(app)
          .get('/loads?status=' + status)
          .set({Authorization: user.token});
        expect(res.statusCode).toBe(200);
      });
    });
  });

  describe('getting of all personal loads of the company', () => {
    getUser('bahaway@gmail.com', 'bahaway');

    it('should get of all personal trips of the company', async () => {
      const res = await request(app)
        .get('/loads/carrier')
        .set({Authorization: user.token});
      expect(res.statusCode).toBe(200);
    });
  });

  describe('create a new load', () => {
    createLoad();
  });

});

afterAll(() => mongoose.disconnect());
