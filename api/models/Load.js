const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const idValidator = require('mongoose-id-validator');

const Schema = mongoose.Schema;

const LoadSchema = new Schema({
    loadCode: {
        type: String,
        required: true,
        unique: true,
    },
    driverId: {
        type: Schema.Types.ObjectId,
        ref: 'Driver',
        required: true,
    },
    dispatchId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    miles: {
        type: Number,
        required: true,
        min: 0
    },
    rpm: {
        type: Number,
        required: true,
        min: 0
    },
    datePU: {
        type: Date,
        required: true,
    },
    dateDEL: {
        type: Date,
        required: true,
    },
    pu: {
        type: String,
        required: true,
    },
    del: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['upcoming', 'transit', 'finished'],
    },
    BOL: String,
    RC: String,
    comment: String
});

LoadSchema.plugin(uniqueValidator, {message: 'Error, expected {PATH} to be unique'});
LoadSchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});

const Load = mongoose.model('Load', LoadSchema);
module.exports = Load;