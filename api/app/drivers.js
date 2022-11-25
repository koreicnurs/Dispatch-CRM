const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');

const Driver = require('../models/Driver');
const User = require("../models/User");
const auth = require('../middleware/auth');
const config = require('../config');
const permit = require("../middleware/permit");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({storage});

router.get('/', auth, async (req, res) => {
  try {
    if (req.query.carrier) {
      const driversByCarrier = await Driver
        .find({companyId: req.query.carrier}).populate('companyId', 'title');

      res.send(driversByCarrier);
    } else {
      const drivers = await Driver.find().populate('companyId', 'title');

      res.send(drivers);
    }

  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/carrier', auth, permit('carrier'), async (req, res) => {
  try {
    const drivers = await Driver
      .find({companyId: req.user.companyId}).populate('companyId', 'title');

    res.send(drivers);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).populate('companyId', 'title');

    res.send(driver);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', auth, upload.single('license'), async (req, res) => {
  try {
    const {email, name, phoneNumber, companyId, status, description} = req.body;

    const duplicatedEmail = await User.findOne({email});

    if (duplicatedEmail) {
      const error = new Error();
      error.errors = {
        email: {
          "name": "ValidatorError",
          "message": "Error, expected email to be unique."
        }
      }
      throw error;
    }
    
    const driverData = {
      email,
      name,
      phoneNumber,
      companyId,
      status,
      description: JSON.parse(description),
      license: req.file ? 'uploads/' + req.file.filename : null,
    };
    const driver = new Driver(driverData);

    await driver.save();
    res.send(driver);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/carrier', auth, permit('carrier'), upload.single('license'), async (req, res) => {
  try {
    const {email, name, phoneNumber, status, description} = req.body;

    const driverData = {
      email,
      name,
      phoneNumber,
      companyId: req.user.companyId,
      status,
      description: JSON.parse(description),
      license: req.file ? 'uploads/' + req.file.filename : null,
    };
    const driver = new Driver(driverData);

    await driver.save();
    res.send(driver);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put('/:id', auth, upload.single('license'), async (req, res) => {
  try {
    const {email, name, phoneNumber, companyId, status, description, pickUp,
      delivery, ETA, readyTime, notes} = req.body;

    const duplicatedEmail = await User.findOne({email});

    if (duplicatedEmail) {
      const error = new Error();
      error.errors = {
        email: {
          "name": "ValidatorError",
          "message": "Error, expected email to be unique."
        }
      }
      throw error;
    }

    const driver = await Driver.findById(req.params.id);

    driver.email = email;
    driver.name = name;
    driver.phoneNumber = phoneNumber;
    driver.companyId = companyId;
    driver.status = status;
    driver.description = JSON.parse(description);
    driver.pickUp = pickUp;
    driver.delivery = delivery;
    driver.ETA = ETA;
    driver.readyTime = readyTime;
    driver.notes = notes;

    await driver.save();
    res.send(driver);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put('/carrier/:id', auth, permit('carrier'), upload.single('license'), async (req, res) => {
  try {
    const {email, name, phoneNumber, status, description, pickUp,
      delivery, ETA, readyTime, notes} = req.body;

    const driver = await Driver.findOne({
      _id: req.params.id,
      companyId: req.user.companyId
    });

    driver.email = email;
    driver.name = name;
    driver.phoneNumber = phoneNumber;
    driver.companyId = req.user.companyId;
    driver.status = status;
    driver.description = JSON.parse(description);
    driver.pickUp = pickUp;
    driver.delivery = delivery;
    driver.ETA = ETA;
    driver.readyTime = readyTime;
    driver.notes = notes;

    await driver.save();
    res.send(driver);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;