const mongoose = require('mongoose');
const request = require('supertest');
const app  = require("../index");

let uniqueEmail = new Date().valueOf().toString().slice(9)*1;
let uniquePhoneNumber = new Date().valueOf().toString().slice(2)*1;

describe('Testing \'users\' route', () => {
  let admin = null;
  let dispatcher = null;

  const getUser = (email, password) => {
    it('user should successfully login', async () => {
      const res = await request(app)
        .post('/users/sessions')
        .send({email, password});
      expect(res.statusCode).toBe(200);
      admin = res.body;
    });
  };

  const getDispatcher = (email, password) => {
    it('user should successfully login', async () => {
      const res = await request(app)
        .post('/users/sessions')
        .send({email, password});
      expect(res.statusCode).toBe(200);
      dispatcher = res.body;
    });
  };

  describe('test of user login', () => {
    it('user should successfully login', async () => {
      const res = await request(app)
        .post('/users/sessions')
        .send({
          email: 'admin@gmail.com',
          password: 'admin',
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.displayName).toBe('Admin');
      admin = res.body;
    });
  });

  describe('getting of all users', () => {
    getUser('admin@gmail.com', 'admin');
    it('should get array of all users', async () => {
      const res = await request(app)
        .get('/users')
        .set({Authorization: admin.token});
      expect(res.statusCode).toBe(200);
    })
  });

  describe('getting of all dispatchers', () => {
    getUser('admin@gmail.com', 'admin');
    it('should get array of all dispatchers', async () => {
      const res = await request(app)
        .get('/users/dispatchers')
        .set({Authorization: admin.token});
      expect(res.statusCode).toBe(200);
      res.body.forEach(dispatcher => {
        expect(dispatcher.role).toBe("user");
      });
      dispatcher = res.body.find(user => user.displayName === "User");
    })
  });

  describe('save new user', () => {
    it('should save new user on db', async () => {
      const res = await request(app)
        .post('/users')
        .send({
          email: `user${uniqueEmail}@gmail.com`,
          password: "test",
          displayName: "NewUser",
          phoneNumber: `+3${uniquePhoneNumber}`,
          role: "user",
          isWorking: "true"
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.displayName).toBe("NewUser");
    });
  });

  describe('change dispatcher status', () => {
    getUser('admin@gmail.com', 'admin' );
    getDispatcher('user@gmail.com', 'user');

    it('should change \'isWorking\' to false', async () => {
      const res1 = await request(app)
        .get('/users')
        .set({Authorization: admin.token});
      let dispatcher = res1.body[0];
      const res = await request(app)
        .put('/users/?isWorking=false')
        .send(dispatcher)
        .set({Authorization: admin.token});
      expect(res.statusCode).toBe(200);
      expect(res.body.isWorking).toBe('disabled');
    });
  });

});

afterAll(() => mongoose.disconnect());
