const express = require('express');

const auth = require('../middleware/auth');
const permit = require("../middleware/permit");
const Learning = require('../models/Learning');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    if (!req.query.category) {
      return res.status(400).send('Learning Category should be received!');
    }

    const learnings = await Learning.find({learningCategory: req.query.category}).populate('learningCategory');
    
    res.send(learnings);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const learning = await Learning.findById(req.params.id).populate('learningCategory');

    if (!learning) {
      return res.status(404).send('Learning not found');
    }

    res.send(learning);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', auth, permit('admin'), async (req, res) => {
  try {
    const {title, description, text, learningCategory} = req.body;
    
    const learningData = {
      title,
      description,
      author: req.user._id,
      text,
      learningCategory,
    };
    
    const learning = new Learning(learningData);
    await learning.save();
    
    res.send(learning);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/comment/:id', auth, async (req, res) => {
  try {
    const learning = await Learning.findById(req.params.id);

    if (!learning) {
      return res.status(404).send('Learning not found');
    }
    const {text} = req.body;

    learning.comment.push({authorId: req.user._id, text});

    await learning.save();

    res.send(learning);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put('/:id', auth, permit('admin'), async (req, res) => {
  const learningId = req.params.id;

  try {
    const {title, description, text, learningCategory} = req.body;
    const learningData = {title, description, text, learningCategory};

    const learning = await Learning.findById(learningId);

    if (!learning) {
      return res.status(404).send('Learning not found');
    }
    await Learning.findByIdAndUpdate(learningId, learningData);

    return res.send(learningData);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
  const learningId = req.params.id;
  try {
    const learning = await Learning.findById(learningId);
    
    if (!learning) {
      return res.status(404).send('Learning not found');
    }

    await Learning.deleteOne({_id: learningId});
    return res.send('Learning was deleted');
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;