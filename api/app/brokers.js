const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const Broker = require('../models/Broker');

router.get('/', auth,  async (req, res) => {
  try {
    const brokers = await Broker.find();
    
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
      author: req.user._id
    };
    const broker = new Broker(brokerData);
    await broker.save();
    res.send(broker);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put('/:id', auth,  async (req, res) => {
  try {
    const roles = ['admin'];
    const brokerId = req.params.id;
    const userId = req.user._id;
    const {name, phoneNumber, mc, description, companiesContract} = req.body;
    const brokerData = {name, phoneNumber, mc, description, companiesContract};
    
    const broker = await Broker.findById(brokerId);
  
    if (!broker) {
      return res.status(404).send('Broker not found');
    }

    if (broker.author.toString() === userId.toString() || roles.includes(req.user.role)) {
      await Broker.findByIdAndUpdate(brokerId, brokerData);
    
      const updatedBroker = await Broker.findById(brokerId);
      return res.send(updatedBroker);
    } else {
      return res.status(403).send('You can not update a broker!');
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

router.delete('/:id', auth,  async (req, res) => {
  try {
    const roles = ['admin'];
    const brokerId = req.params.id;
    const userId = req.user._id;
    const broker = await Broker.findById(brokerId);
    
    if (!broker) {
      return res.status(404).send('You don\'t have access to edit');
    }
    
    if (broker.author.toString() === userId.toString() || roles.includes(req.user.role)) {
      await Broker.deleteOne({_id: brokerId});
  
      return res.send('Broker was deleted');
    } else {
      return res.status(403).send('You don\'t have access to edit!');
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;