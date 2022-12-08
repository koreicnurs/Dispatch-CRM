const express = require('express');
const auth = require('../middleware/auth');
const permit = require("../middleware/permit");
const router = express.Router();
const Broker = require('../models/Broker');

router.get('/', auth,  async (req, res) => {
  try {
    const brokers = await Broker.find().populate('companiesContract');
    
    res.send(brokers);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', auth,  async (req, res) => {
  try {
    const {name, phoneNumber, mc, description, companiesContract} = req.body;
    
    const brokerData = {
      name,
      phoneNumber,
      mc,
      description,
      companiesContract,
    };
    const broker = new Broker(brokerData);
    await broker.save();
    res.send(broker);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put('/:id', auth, permit('admin', 'user'), async (req, res) => {
  try {
    const brokerId = req.params.id;
    const {name, phoneNumber, mc, description, companiesContract} = req.body;
    const brokerData = {name, phoneNumber, mc, description, companiesContract};
    
    const broker = await Broker.findById(brokerId);
  
    if (!broker) {
      return res.status(404).send('Broker not found');
    }

    const updatedBroker = await Broker.findOneAndUpdate({_id: brokerId}, brokerData, {new: true,
      runValidators: true});

    return res.send(updatedBroker);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.delete('/:id', auth, permit('admin', 'user'), async (req, res) => {
  try {
    const brokerId = req.params.id;
    const broker = await Broker.findById(brokerId);
    
    if (!broker) {
      return res.status(404).send('You don\'t have access to edit');
    }
    
    await Broker.deleteOne({_id: brokerId});

    return res.send('Broker was deleted');
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;