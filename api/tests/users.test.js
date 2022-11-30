const mongoose = require('mongoose');
const request = require('supertest');
const app  = require("../index");

describe('Testing \'users\' route', () => {
  let admin;
  let dispatcher;
  const newUser = {
    email: "newUser@gmail.com",
    password: "test",
    displayName: "NewUser",
    phoneNumber: "+99655555555",
    role: "user",
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
    it('should get array of all users', async () => {
      const res = await request(app)
        .get('/users')
        .set({Authorization: admin.token});
      expect(res.statusCode).toBe(200);
    })
  });

  describe('getting of all dispatchers', () => {
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
        .send(newUser);
      expect(res.statusCode).toBe(200);
      expect(res.body.displayName).toBe("NewUser");
    });
  });

  describe('change dispatcher status', () => {
    it('should change \'isWorking\' to false', async () => {
      const res = await request(app)
        .put('/users/?isWorking=false')
        .send(dispatcher)
        .set({Authorization: admin.token});
      expect(res.statusCode).toBe(200);
      expect(res.body.isWorking).toBe(false);
    });
  });

});

afterAll(() => mongoose.disconnect());
