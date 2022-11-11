const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const Schema = mongoose.Schema;

const LearningSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

LearningSchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});

const Learning = mongoose.model('Learning', LearningSchema);
module.exports = Learning;