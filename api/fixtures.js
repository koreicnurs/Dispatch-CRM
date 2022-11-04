const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');

const run = async () => {
  await mongoose.connect(config.mongo.db);
  
  const collections = await mongoose.connection.db.listCollections().toArray();
  
  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }
  
  await User.create({
    email: 'admin@gmail.com',
    password: 'admin',
    role: 'admin',
    token: nanoid(),
    displayName: 'Admin',
    avatarImage: 'fixtures/admin.png',
  }, {
    email: 'user@gmail.com',
    password: 'user',
    role: 'user',
    token: nanoid(),
    displayName: 'User',
    avatarImage: 'fixtures/user.png',
  });
  
  await mongoose.connection.close();
};

run().catch(console.error);