const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Carrier = require('./models/Carrier');
const Driver = require("./models/Driver");
const Load = require("./models/Load");
const Learning = require("./models/Learning");
const Broker = require("./models/Broker");

const run = async () => {
  await mongoose.connect(config.mongo.db);
  
  const collections = await mongoose.connection.db.listCollections().toArray();
  
  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

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

  const [admin, user, user2, bahCarrier] = await User.create({
    email: 'admin@gmail.com',
    password: 'admin',
    role: 'admin',
    token: nanoid(),
    displayName: 'Admin',
    avatar: 'fixtures/admin.png',
  }, {
    email: 'user@gmail.com',
    password: 'user',
    role: 'user',
    token: nanoid(),
    displayName: 'User',
    avatar: 'fixtures/user.png',
    phoneNumber: '+267●5350802'
  }, {
    email: 'user2@gmail.com',
    password: 'user2',
    role: 'user',
    token: nanoid(),
    displayName: 'User2',
    phoneNumber: '+267●5350802'
  }, {
    email: 'bahaway@gmail.com',
    password: 'bahaway',
    role: 'carrier',
    token: nanoid(),
    displayName: 'BAHAWAY',
    companyId: bahawayCarrier._id,
  }, {
    email: 'safeway@gmail.com',
    password: 'safeway',
    role: 'carrier',
    token: nanoid(),
    displayName: 'SAFEWAY CARGO',
    companyId: safewayCargoCarrier._id,
    phoneNumber: '+267●5350802'
  });

  const [umotDriver, kubaDriver, timurDriver, keldibekDriver, bakdoolotDriver, askhatDriver,
    mirbekDriver, bekmuratDriver, makenDriver] = await Driver.create({
    email: 'umot@gmail.com',
    name: 'Umot',
    phoneNumber: '+267●5350802',
    companyId: bahawayCarrier._id,
    status: 'in transit',
    telegramId: '',
    description: {
      address: 'US, LA, Avalon c., str. 1, h. 45',
      DOB: '15.12.1980',
      info: 'Lorem ipsum dolor sit amet',
      reference: 'Punctual, decent'
    }
  }, {
    email: 'kuba@gmail.com',
    name: 'Kuba',
    phoneNumber: '+929●3774446',
    companyId: bahawayCarrier._id,
    status: 'upcoming',
    telegramId: '',
    description: {
      address: 'US, LA, Downey c., str. 1, h. 4',
      DOB: '5.04.1990',
      info: 'lorem',
      reference: 'Honest, communicative'
    }
  }, {
    email: 'timur@gmail.com',
    name: 'Timur',
    phoneNumber: '+323●7454492',
    companyId: safewayCargoCarrier._id,
    status: 'off/home',
    telegramId: '',
    description: {
      address: 'US, IL, Chicago c., str. 1, h. 4',
      DOB: '12.06.1988',
      info: 'lorem',
      reference: 'Communicative'
    }
  }, {
    email: 'keldibek@gmail.com',
    name: 'Keldibek',
    phoneNumber: '+513●8081130',
    companyId: safewayCargoCarrier._id,
    status: 'ready',
    telegramId: '',
    description: {
      address: 'US, IL, Chicago c., str. 1, h. 48',
      DOB: '30.08.1995',
      info: 'Lorem ipsum dolor sit amet',
      reference: 'Good driver'
    }
  }, {
    email: 'bakdoolot@gmail.com',
    name: 'Bakdoolot',
    phoneNumber: '+630●6702075',
    companyId: safewayCargoCarrier._id,
    status: 'n/a',
    telegramId: '',
    description: {
      address: 'US, IL, Chicago c., str. 10, h. 48',
      DOB: '25.07.1993',
      info: 'lorem',
      reference: 'Professional with all required skills'
    }
  }, {
    email: 'askhat@gmail.com',
    name: 'Askhat',
    phoneNumber: '+312●6840690',
    companyId: turanExpressCarrier._id,
    status: 'sleep',
    telegramId: '',
    description: {
      address: 'US, NY, New-York c., 5 Avenue, h. 48',
      DOB: '18.12.2005',
      info: 'Lorem ipsum dolor sit amet',
      reference: 'Needs to gain more experience'
    },
    pickUp: 'Ohio',
    delivery: 'Pennsylvania',
    ETA: '04:00',
    readyTime: '15.11.2022',
    notes: 'bla bla',
  }, {
    email: 'mirbek@gmail.com',
    name: 'Mirbek',
    phoneNumber: '+773●6913604',
    companyId: turanExpressCarrier._id,
    status: 'in tr/upc',
    telegramId: '',
    description: {
      address: 'US, NY, New-York c., str. 56, h. 48',
      DOB: '3.01.1996',
      info: 'lorem',
      reference: 'Positive guy'
    }
  }, {
    email: 'bekmurat@gmail.com',
    name: 'Bekmurat',
    phoneNumber: '+773●9466304',
    companyId: tumarExpressCarrier._id,
    status: 'ready',
    telegramId: '',
    description: {
      address: 'US, MS, Gulfport c., str. 4, h. 75, ap. 7',
      DOB: '22.02.1992',
      info: 'Lorem ipsum dolor sit amet',
      reference: 'Reliable guy'
    }
  }, {
    email: 'maken@gmail.com',
    name: 'Maken',
    phoneNumber: '+347●4941314',
    companyId: tumarExpressCarrier._id,
    status: 'in transit',
    telegramId: '',
    description: {
      address: 'US, TX, Houston c., str. 45, h. 12, ap. 12',
      DOB: '5.05.1995',
      info: 'lorem',
      reference: 'Responsible guy'
    }
  });

  await Load.create({
    loadCode: 'T-114K1J2M7',
    driverId: umotDriver._id,
    dispatchId: user._id,
    price: 1335.6,
    miles: 445.2,
    rpm: 3,
    datePU: '11/5/2022',
    dateDEL: '11/9/2022',
    timeToPU: '22:16',
    timeToDel: '11:16',
    pu: 'Shepherd, KY',
    del: 'Pittsburg, PA',
    status: 'transit',
  }, {
    loadCode: 'T-151F5454FEG',
    driverId: kubaDriver._id,
    dispatchId: user._id,
    price: 800,
    miles: 200,
    rpm: 4,
    datePU: '11/15/2022',
    dateDEL: '11/16/2022',
    timeToPU: '10:16',
    timeToDel: '15:16',
    pu: 'Pittsburg, PA',
    del: 'Boston, MA',
    status: 'cancel',
  }, {
    loadCode: 'T-454GRG45R4G',
    driverId: timurDriver._id,
    dispatchId: user._id,
    price: 1750,
    miles: 700,
    rpm: 2.5,
    datePU: '11/5/2022',
    dateDEL: '11/8/2022',
    timeToPU: '3:16',
    timeToDel: '19:16',
    pu: 'New-York, NY',
    del: 'Chicago, IL',
    status: 'finished',
  }, {
    loadCode: 'T-12FEF4E5F',
    driverId: keldibekDriver._id,
    dispatchId: user2._id,
    price: 2500,
    miles: 500,
    rpm: 5,
    datePU: '11/20/2022',
    dateDEL: '11/22/2022',
    timeToPU: '22:0',
    timeToDel: '11:05',
    pu: 'Chicago, IL',
    del: 'Lafayette, LA',
    status: 'upcoming',
  }, {
    loadCode: 'T-1FEFS12S',
    driverId: makenDriver._id,
    dispatchId: user2._id,
    price: 750,
    miles: 250,
    rpm: 3,
    datePU: '11/9/2022',
    dateDEL: '11/10/2022',
    timeToPU: '11:0',
    timeToDel: '12:10',
    pu: 'Houston, TX',
    del: 'New Orleans, LA',
    status: 'transit',
  }, {
    loadCode: 'T-D1EF45SD1C',
    driverId: askhatDriver._id,
    dispatchId: user2._id,
    price: 1500,
    miles: 500,
    rpm: 3,
    datePU: '11/1/2022',
    dateDEL: '11/3/2022',
    timeToPU: '1:0',
    timeToDel: '18:0',
    pu: 'New-York, NY',
    del: 'Seattle, WS',
    status: 'finished',
  });
  
  await Learning.create(
    {
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non',
      author: user._id,
    }, {
      title: 'Convallis convallis',
      description: 'Convallis convallis tellus id interdum velit laoreet id donec ultrices.',
      author: user2._id,
    }, {
      title: 'Metus',
      description: 'Metus vulputate eu scelerisque felis imperdiet proin fermentum leo.',
      author: user2._id,
    }
  );
  
  await Broker.create(
    {
      name: 'Azamat',
      author: user._id,
      phoneNumber: ['+99655555555', '+2678480704'],
      mc: 'Lorem1',
      description: 'Lorem ipsum dolor sit amet',
      companiesContract: [bahawayCarrier._id],
    }, {
      name: 'Aibek',
      author: user._id,
      phoneNumber: ['+2678892567'],
      mc: 'Lorem2',
      description: 'Consectetur adipiscing elit',
      companiesContract: [bahawayCarrier._id],
    }, {
      name: 'Nurbek',
      author: user._id,
      phoneNumber: ['+9293525578', '+9294884446'],
      mc: 'Lorem3',
      companiesContract: [bahawayCarrier._id],
    }, {
      name: 'Adilet',
      author: user2._id,
      phoneNumber: ['+996999523214', '+7678480704', '+3232523146'],
      mc: 'Lorem4',
      description: 'Convallis convallis tellus id interdum velit laoreet id donec ultrices',
      companiesContract: [bahawayCarrier._id],
    }
  );
  
  await mongoose.connection.close();
};

run().catch(console.error);