const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const validateEmail = value => {
  const pattern = /^\w+(\.?\w+)*@\w+(\.?\w+)*(\.\w{2,3})+$/;
  
  if (!pattern.test(value)) return false;
};

const validatePhoneNumber = value => {
  const pattern = /^\+(?:[0-9]●?){6,14}[0-9]$/;
  
  if (!pattern.test(value)) return false;
};

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      {validator: validateEmail, message: 'Email is not valid!'},
    ]
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    validate: [
      {validator: validatePhoneNumber, message: 'Phone number is not valid!'}
    ],
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Carrier',
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['in transit', 'upcoming', 'off/home', 'n/a', 'sleep', 'ready', 'in tr/upc'],
  },
  description: {
    type: Map,
    of: new Schema({
      address: String,
      DOB: String,
      info: String,
      reference: String,
    }),
    required: true,
  },
});

DriverSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

const Driver = mongoose.model('Driver', DriverSchema);
module.exports = Driver;