const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const LearningCategorySchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
});

LearningCategorySchema.plugin(uniqueValidator, {message: 'This Learning Category already exists'});
const LearningCategory = mongoose.model('LearningCategory', LearningCategorySchema);
module.exports = LearningCategory;