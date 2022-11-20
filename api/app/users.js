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
    const {displayName, password, oldPassword, email} = req.body;

    const user = await User.findOne({_id: req.user._id});
    const isMatch = await user.checkPassword(oldPassword);

    if (isMatch) {
      let userData;

      if (password !== "") {
        userData = {
          displayName,
          email,
          password,
          avatar: req.file ? 'uploads/' + req.file.filename : req.body.avatar,
        };
      } else {
        userData = {
          displayName,
          email,
          avatar: req.file ? 'uploads/' + req.file.filename : req.body.avatar,
        };
      }

      const updateUser = await User.findOneAndUpdate({_id: req.user._id}, userData, {new: true});
      res.send(updateUser);
    } else {
      return res.status(401).send({message: 'Old password is wrong!'});
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put('/change_dispatcher', auth, upload.single('avatar'), async (req, res) => {
  try {
    const {email, password, displayName, role, id} = req.body;

    const user = await User.find({_id: id});

    let userData;

    if(password !== "") {
      userData = {
        email,
        password,
        displayName,
        role,
        avatar: req.file ? 'uploads/' + req.file.filename : user.avatar,
      };
    } else {
      userData = {
        email,
        displayName,
        role,
        avatar: req.file ? 'uploads/' + req.file.filename : user.avatar,
      };
    }

    const updateUser = await User.findOneAndUpdate({_id: id}, userData, {new: true});
    res.send(updateUser);
  } catch (e) {
    res.status(400).send(e);
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