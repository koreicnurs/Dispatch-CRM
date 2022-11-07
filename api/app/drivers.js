const express = require('express');

const Driver = require('../models/Driver');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.find();
    
    res.send(drivers);
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

module.exports = router;