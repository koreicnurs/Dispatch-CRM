const express = require('express');

const Driver = require('../models/Driver');

const router = express.Router();

router.get('/', async (req, res) => {
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

router.post('/', async (req, res) => {
  try {
    const {email, name, phoneNumber, companyId, status, description} = req.body;
    
    const driverData = {
      email,
      name,
      phoneNumber,
      companyId,
      status,
      description
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
    const {email, name, phoneNumber, companyId, status, description} = req.body;
    console.log(req.body);
    console.log(req.params.id);
    const driverData = {
      email,
      name,
      phoneNumber,
      companyId,
      status,
      description
    };
    const updateDriver = await Driver.findOneAndUpdate({_id: req.params.id}, driverData, {new: true});

    res.send(updateDriver);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;