const Joi = require('joi');
const mongoose = require('mongoose');

let beaconSchema = new mongoose.Schema({name: String, validado: Boolean});

const Reward = mongoose.model('Reward', new mongoose.Schema({
    account_id: {
        type: String,
        minlegth: 24,
        maxlength: 24,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlegth: 3,
        maxlength: 30
    },
    ciudad: {
        type: String,
        required: true,
        minlegth: 5,
        maxlength: 10
    },
    recompensa: {
        type: Number,
        required: true,
    },
    beacons: {
        type: [beaconSchema],
        required: true
    },
    terminada: {
        type: Boolean,
        required: true
    },
    canjeada: {
        type: Boolean,
        required: true
    }
}));

function validate(reward) {
    const schema = {
        account_id: Joi.string().min(24).max(24),
        name: Joi.string().min(3).max(30).required(),
        ciudad: Joi.string().min(5).max(10).required(),
        recompensa: Joi.number().integer().required(),
    };

    return Joi.validate(reward, schema);
}

exports.Reward = Reward;
exports.validate = validate;