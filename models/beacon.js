const Joi = require('joi');
const mongoose = require('mongoose');

const Beacon = mongoose.model('Beacon', new mongoose.Schema({
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
    },
    ruta: {
        type: String,
        required: false,
        minlegth: 0,
        maxlength: 50
    }
}));

function validate(beacon) {
    const schema = {
        account_id: Joi.string().min(24).max(24),
        name: Joi.string().min(3).max(30).required(),
        longitud: Joi.number().integer().required(),
        latitud: Joi.number().integer().required(),
        ciudad: Joi.string().min(5).max(10).required(),
        ruta: Joi.string().max(50)
    };

    return Joi.validate(beacon, schema);
}

exports.Beacon = Beacon;
exports.validate = validate;