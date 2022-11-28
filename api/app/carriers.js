const express = require('express');

const Carrier = require('../models/Carrier');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const carriers = await Carrier.find();
    res.send(carriers);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const carrier = await Carrier.findById(req.params.id);
    res.send(carrier);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const {title, mc, dot, fedid, description, phoneNumber} = req.body;
    const carrierData = {title, mc, dot, fedid, description, phoneNumber};

    const carrier = new Carrier(carrierData);
    await carrier.save();

    res.send(carrier);

  } catch (e) {
    res.status(400).send(e);
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const {title, mc, dot, fedid, description, phoneNumber} = req.body;

    const carrier = await Carrier.findById(req.params.id);

    carrier.title = title;
    carrier.mc = mc;
    carrier.dot = dot;
    carrier.fedid = fedid;
    carrier.description = description;
    carrier.phoneNumber = phoneNumber;

    await carrier.save();
    
    res.send(carrier);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;