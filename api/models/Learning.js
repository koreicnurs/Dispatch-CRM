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
    default: new Date().toISOString(),
    required: true
  },
  text: {
    type: String,
    required: true,
  },
  learningCategory: {
    type: Schema.Types.ObjectId,
    ref: 'LearningCategory',
    required: true,
  },
  comment: [{
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }]
});

LearningSchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});

const Learning = mongoose.model('Learning', LearningSchema);
module.exports = Learning;