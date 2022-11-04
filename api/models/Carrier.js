const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

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
  description: String
});

CarrierSchema.plugin(uniqueValidator, {message: 'Error, expected {PATH} to be unique'});
const Carrier = mongoose.model('Carrier', CarrierSchema);

module.exports = Carrier;