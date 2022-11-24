const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const idValidator = require('mongoose-id-validator');

const validateDate = value => {
    const pattern = /^([1-9]|1[0-2])\/([1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    
    if (!pattern.test(value)) return false;
};

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
        type: String,
        required: true,
        validate: [
            {validator: validateDate, message: 'Loading date is not valid!'},
        ]
    },
    dateDEL: {
        type: String,
        required: true,
        validate: [
            {validator: validateDate, message: 'Arrival date is not valid!'},
        ]
    },
    timeToPU: String,
    timeToDel: {
        type: String,
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
        default: 'upcoming',
        enum: ['upcoming', 'transit', 'finished', 'cancel'],
    },
    BOL: String,
    RC: String,
    comment: String
});

LoadSchema.plugin(uniqueValidator, {message: 'Error, expected {PATH} to be unique'});
LoadSchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});

const Load = mongoose.model('Load', LoadSchema);
module.exports = Load;