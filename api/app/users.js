const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');

const User = require('../models/User');
const config = require('../config');
const auth = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});
const upload = multer({storage});

router.post('/', upload.single('avatar'), async (req, res) => {
  try {
    const {email, password, displayName} = req.body;
    const userData = {
      email,
      password,
      displayName,
      avatar: req.file ? 'uploads/' + req.file.filename : null,
    };
    const user = new User(userData);

    user.generateToken();
    await user.save();

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/sessions', async (req,  res) => {
  const {email, password} = req.body;
  
  if (!email || !password) {
    return res.status(400).send('Data not valid');
  }
  
  const user = await User.findOne({email});
  
  if (!user) {
    return res.status(401).send({message: 'Credentials are wrong!'});
  }
  
  const isMatch = await user.checkPassword(password);
  
  if (!isMatch) {
    return res.status(401).send('Credentials are wrong');
  }
  
  try {
    user.generateToken();
    
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put('/', auth, upload.single('avatar'), async (req, res) => {
  try {
    const {displayName, password} = req.body;

    const userData = {
      displayName,
      password,
      avatar: req.file ? 'uploads/' + req.file.filename : null,
    };
    const updateUser = await User.findOneAndUpdate({_id: req.user._id}, userData, {new: true});
    res.send(updateUser);

  } catch (e) {
    res.sendStatus(500);
  }
});

router.delete('/sessions', auth, async (req, res) => {
  try {
    const user = req.user;
    user.generateToken();
    
    await user.save();
    return res.send(user);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;