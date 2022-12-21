const express = require('express');

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const LearningCategory = require('../models/LearningCategory');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const categories = await LearningCategory.find();

    res.send(categories);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', auth, permit('admin'), async (req, res) => {
  try {
    const learningCategoryData = {title: req.body.title};

    const learningCategory = new LearningCategory(learningCategoryData);
    await learningCategory.save();

    res.send(learningCategory);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;