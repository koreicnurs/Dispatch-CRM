const express = require('express');

const auth = require('../middleware/auth');
const Learning = require('../models/Learning');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const learnings = await Learning.find();
    
    res.send(learnings);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const {title, description} = req.body;
    
    const learningData = {
      title,
      description,
      author: req.user._id,
    };
    
    const learning = new Learning(learningData);
    await learning.save();
    
    res.send(learning);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put('/:id', auth, async (req, res) => {
  const learningId = req.params.id;
  const userId = req.user._id;
  try {
    const {title, description} = req.body;
    const learningData = {title, description};

    const learning = await Learning.findById(learningId);

    if (!learning) {
      return res.status(404).send('Learning not found');
    }
    if (learning.author.toString() === userId.toString()) {
      await Learning.findByIdAndUpdate(learningId, learningData);
  
      const updatedLearning = await Learning.find({_id: learningId, author: userId});
      return res.send(updatedLearning);
    } else {
      return res.status(403).send('You can not update a learning that is not yours!');
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

router.delete('/:id', auth, async (req, res) => {
  const roles = ['admin'];
  const learningId = req.params.id;
  const user = req.user;
  try {
    const learning = await Learning.findById(learningId);
    
    if (!learning) {
      return res.status(404).send('Learning not found');
    }
    if (learning.author.toString() === user._id.toString() || roles.includes(user.role)) {
      await Learning.deleteOne({_id: learningId});
      
      return res.send('Learning was deleted');
    } else {
      return res.status(403).send('You can not delete a learning that is not yours!');
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;