const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {nanoid} = require('nanoid');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const validatePhoneNumber = value => {
  const pattern = /^\+(?:[0-9]●?){6,14}[0-9]$/;

  if (!pattern.test(value)) return false;
};

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin', 'carrier'],
  },
  displayName: {
    type: String,
    required: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Carrier',
    required: this.role === 'carrier',
  },
  avatar:  String,
  telegramId: Number,
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    validate: [
      {validator: validatePhoneNumber, message: 'Phone number is not valid!'}
    ],
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next;
  
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);
  
  this.password = hash;
  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  }
});

UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function() {
  this.token = nanoid();
};

UserSchema.plugin(uniqueValidator, {message: 'This user is already registered'});

const User = mongoose.model('User', UserSchema);
module.exports = User;