const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');

const User = require('../models/User');
const config = require('../config');
const auth = require('../middleware/auth');
const permit = require("../middleware/permit");

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

router.get('/dispatchers', auth, permit('admin'), async (req, res) => {
  try {
    const dispatchers = await User.find({role: 'user'});
    res.send(dispatchers);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', upload.single('avatar'), async (req, res) => {
  try {
    const {email, password, displayName, phoneNumber} = req.body;
    const userData = {
      email,
      password,
      displayName,
      phoneNumber,
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

router.post('/dispatchers', auth, permit('admin'), upload.single('avatar'), async (req, res) => {
  try {
    const {email, password, displayName, phoneNumber} = req.body;
    const userData = {
      email,
      password,
      displayName,
      phoneNumber,
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

router.put('/change_dispatcher', auth, permit('user'), upload.single('avatar'), async (req, res) => {
  try {
    const {displayName, password, phoneNumber} = req.body;

    const userData = {
      displayName,
      password,
      phoneNumber,
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

router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;