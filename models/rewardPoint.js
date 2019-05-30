const Joi = require('joi');
const mongoose = require('mongoose');

const RewardPoint = mongoose.model('RewardPoint', new mongoose.Schema({
    account_id: {
        type: String,
        required: true,
        minlegth: 24,
        maxlength: 24
    },
    name: {
        type: String,
        required: true,
        minlegth: 3,
        maxlength: 30
    },
    descripcion: {
        type: String,
        required: false,
        minlegth: 0,
        maxlength: 300
    },
    longitud: {
        type: Number,
        required: true,
    },
    latitud: {
        type: Number,
        required: true,
    },
    ciudad: {
        type: String,
        required: true,
        minlegth: 5,
        maxlength: 10
    }
}));

function validate(rewardPoint) {
    const schema = {
        account_id: Joi.string().min(24).max(24).required(),
        name: Joi.string().min(3).max(30).required(),
        descripcion: Joi.string().max(300),
        longitud: Joi.number().integer().required(),
        latitud: Joi.number().integer().required(),
        ciudad: Joi.string().min(5).max(10).required()
    };

    return Joi.validate(rewardPoint, schema);
}

exports.RewardPoint = RewardPoint;
exports.validate = validate;