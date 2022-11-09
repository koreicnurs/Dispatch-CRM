const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Carrier = require('./models/Carrier');
const Driver = require("./models/Driver");

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

  const [bahawayCarrier, safewayCargoCarrier, turanExpressCarrier, tumarExpressCarrier] = await Carrier.create({
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

  const [] = await Driver.create({
    email: 'umot@gmail.com',
    name: 'Umot',
    phoneNumber: '267-535-08-02',
    companyId: bahawayCarrier._id,
    status: 'in transit',
    description: {
      address: 'US, LA, Avalon c., str. 1, h. 45',
      DOB: '15.12.1980',
      info: '',
      reference: 'Punctual, decent'
    }
  }, {
    email: 'kuba@gmail.com',
    name: 'Kuba',
    phoneNumber: '929-377-44-46',
    companyId: bahawayCarrier._id,
    status: 'upcoming',
    description: {
      address: 'US, LA, Downey c., str. 1, h. 4',
      DOB: '5.04.1990',
      info: '',
      reference: 'Honest, communicative'
    }
  }, {
    email: 'timur@gmail.com',
    name: 'Timur',
    phoneNumber: '323-745-44-92',
    companyId: safewayCargoCarrier._id,
    status: 'off/home',
    description: {
      address: 'US, IL, Chicago c., str. 1, h. 4',
      DOB: '12.06.1988',
      info: '',
      reference: 'Communicative'
    }
  }, {
    email: 'keldibek@gmail.com',
    name: 'Keldibek',
    phoneNumber: '513-808-11-30',
    companyId: safewayCargoCarrier._id,
    status: 'ready',
    description: {
      address: 'US, IL, Chicago c., str. 1, h. 48',
      DOB: '30.08.1995',
      info: '',
      reference: 'Good driver'
    }
  } , {
    email: 'bakdoolot@gmail.com',
    name: 'Bakdoolot',
    phoneNumber: '630-670-20-75',
    companyId: safewayCargoCarrier._id,
    status: 'n/a',
    description: {
      address: 'US, IL, Chicago c., str. 10, h. 48',
      DOB: '25.07.1993',
      info: '',
      reference: 'Professional with all required skills'
    }
  } , {
    email: 'askhat@gmail.com',
    name: 'Askhat',
    phoneNumber: '312-684-06-90',
    companyId: turanExpressCarrier._id,
    status: 'sleep',
    description: {
      address: 'US, NY, New-York c., 5 Avenue, h. 48',
      DOB: '18.12.2005',
      info: '',
      reference: 'Needs to gain more experience'
    }
  } , {
    email: 'mirbek@gmail.com',
    name: 'Mirbek',
    phoneNumber: '773-691-36-04',
    companyId: turanExpressCarrier._id,
    status: 'in tr/upc',
    description: {
      address: 'US, NY, New-York c., str. 56, h. 48',
      DOB: '3.01.1996',
      info: '',
      reference: 'Positive guy'
    }
  } , {
    email: 'bekmurat@gmail.com',
    name: 'Bekmurat',
    phoneNumber: '773-946-6304',
    companyId: tumarExpressCarrier._id,
    status: 'ready',
    description: {
      address: 'US, MS, Gulfport c., str. 4, h. 75, ap. 7',
      DOB: '22.02.1992',
      info: '',
      reference: 'Reliable guy'
    }
  } , {
    email: 'maken@gmail.com',
    name: 'Maken',
    phoneNumber: '347-494-13-14',
    companyId: tumarExpressCarrier._id,
    status: 'ready',
    description: {
      address: 'US, TX, Houston c., str. 45, h. 12, ap. 12',
      DOB: '5.05.1995',
      info: '',
      reference: 'Responsible guy'
    }
  });
  
  await mongoose.connection.close();
};

run().catch(console.error);