const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const validatePhoneNumber = value => {
  const pattern = /^\+(?:[0-9]●?){6,14}[0-9]$/;
  
  if (!pattern.test(value)) return false;
};

const BrokerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: [{
    type: String,
    required: true,
    validate: [
      {validator: validatePhoneNumber, message: 'Phone number is not valid!'}
    ],
  }],
  mc: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  companiesContract: [{
    type: Schema.Types.ObjectId,
    ref: 'Carrier',
    required: true
  }]
});

BrokerSchema.plugin(uniqueValidator, {message: 'This Broker is already registered'});
const Broker = mongoose.model('Broker', BrokerSchema);
module.exports = Broker;