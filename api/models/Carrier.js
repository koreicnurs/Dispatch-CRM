const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const validatePhoneNumber = value => {
  const pattern = /^\+(?:[0-9]●?){6,14}[0-9]$/;
  
  if (!pattern.test(value)) return false;
};

const CarrierSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  mc: {
    type: String,
    required: true,
    unique: true
  },
  dot: {
    type: String,
    required: true,
    unique: true
  },
  fedid: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    validate: [{validator: validatePhoneNumber, message: 'Phone number is not valid!'}],
  },
  document: String
});

CarrierSchema.plugin(uniqueValidator, {message: 'Error, expected {PATH} to be unique'});
CarrierSchema.index({title: "text"});
const Carrier = mongoose.model('Carrier', CarrierSchema);

module.exports = Carrier;