const express = require('express');

const auth = require('../middleware/auth');
const permit = require("../middleware/permit");
const Learning = require('../models/Learning');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    if(!req.query.title) {
      if (!req.query.category) {
        return res.status(400).send('Learning Category should be received!');
      }

      const learnings = await Learning
        .find({learningCategory: req.query.category}, 'title description author date text  learningCategory')
        .sort({date: -1})
        .populate('learningCategory')
        .populate('author', 'displayName');

      res.send(learnings);
    } else {
      const learnings = await Learning
        .find(
          { $text: { $search: req.query.title }, learningCategory: req.query.category})
        .sort({date: -1})
        .populate('learningCategory')
        .populate('author', 'displayName');

      res.send(learnings);
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const learning = await Learning
      .findById(req.params.id)
      .populate('learningCategory')
      .populate('comments.authorId', 'displayName role');

    if (!learning) {
      return res.status(404).send('Learning not found');
    }

    res.send(learning);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/comment/:id', auth, async (req, res) => {
  try {
    const learning = await Learning.findById(req.params.id);

    if (!learning) {
      return res.status(404).send('Learning not found');
    }
    const {text} = req.body;
    const newComment = {authorId: req.user._id, text: text, datetime: new Date().toISOString()};
    learning.comments.unshift(newComment);

    await learning.save();

    res.send(learning);
  } catch (e) {
    res.status(400).send(e);
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
  try {
    await Learning.findByIdAndDelete(req.params.id);
    res.send('Learning is deleted successfully!');
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;