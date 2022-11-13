const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');

const Driver = require('../models/Driver');
const auth = require('../middleware/auth');
const config = require('../config');

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

router.put('/:id', async (req, res) => {
  try {
    const {email, name, phoneNumber, companyId, status, description, pickUp,
      delivery, ETA, readyTime, notes} = req.body;
    const driverData = {
      email,
      name,
      phoneNumber,
      companyId,
      status,
      description,
      pickUp,
      delivery, ETA, readyTime, notes
    };
    const updateDriver = await Driver.findOneAndUpdate({_id: req.params.id}, driverData, {new: true});

    res.send(updateDriver);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;