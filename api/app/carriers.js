const express = require('express');

const Carrier = require('../models/Carrier');

const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const {title, mc, dot, fedid, description} = req.body;
    const carrierData = {title, mc, dot, fedid, description};

    const carrier = new Carrier(carrierData);
    await carrier.save();

    res.send(carrier);

  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const carriers = await Carrier.find();
    res.send(carriers);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;