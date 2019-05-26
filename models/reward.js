const Joi = require('joi');
const mongoose = require('mongoose');

const Reward = mongoose.model('Reward', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlegth: 10,
        maxlength: 10
    },
}));

function validate(reward) {
    const schema = {
        name: Joi.string().min(10).max(10).required()
    };

    return Joi.validate(reward, schema);
}

exports.Reward = Reward;
exports.validate = validate;