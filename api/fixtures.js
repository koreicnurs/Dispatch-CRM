const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Carrier = require('./models/Carrier');

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

  await Carrier.create({
    title: 'BAHAWAY',
    mc: '1180196',
    dot: '3537967',
    fedid: '83-3826233',
    description: 'test company #1'
  }, {
    title: 'SAFEWAY CARGO',
    mc: '1296697',
    dot: '3703312',
    fedid: '87-113019',
    description: 'test company #2'
  }, {
    title: 'TURAN EXPRESS',
    mc: '1256775',
    dot: '3648632',
    fedid: '84-2388341',
    description: 'test company #3'
  }, {
    title: 'TUMAR EXPRESS',
    mc: '918995',
    dot: '2638087',
    fedid: '47-4067936',
    description: 'test company #4'
  });
  
  await mongoose.connection.close();
};

run().catch(console.error);