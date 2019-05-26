const Joi = require('joi');
const mongoose = require('mongoose');

const BeaconValidated = mongoose.model('BeaconValidated', new mongoose.Schema({
    account_id: {
        type: String,
        minlegth: 24,
        maxlength: 24,
        required: true
    },
    beacon: {
        type: String,
        required: true,
        minlegth: 5,
        maxlength: 10
    }
}));

exports.BeaconValidated = BeaconValidated;