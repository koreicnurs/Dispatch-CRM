const express = require('express');

const Carrier = require('../models/Carrier');

const router = express.Router();

router.post('/', async (req, res) => {
  const {title, mc, dot, fedid, description} = req.body;

  const carrierData = {title, mc, dot, fedid, description};

  try {
    if (!title || !mc || !dot || !fedid) {
      return res.status(400).send({error: 'Data not valid'});
    }

    const carrier = new Carrier(carrierData);
    await carrier.save();
    res.send(carrier);

  } catch (e) {
    res.send(e);
  }
});

router.get('/', async (req, res) => {
  try {
    const carriers = await Carrier.find();
    res.send(carriers);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;