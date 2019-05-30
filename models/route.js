const Joi = require('joi');
const mongoose = require('mongoose');

const Route = mongoose.model('Route', new mongoose.Schema({
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
    descripcion: {
        type: String,
        required: false,
        minlegth: 0,
        maxlength: 50
    },
    ciudad: {
        type: String,
        required: true,
        minlegth: 5,
        maxlength: 10
    },
    recompensa: {
        type: Number,
        required: true
    },
    puntos: {
        type: Array,
        required: true
    }
}));

function validate(route) {
    const schema = {
        account_id: Joi.string().min(24).max(24),
        name: Joi.string().min(3).max(30).required(),
        descripcion: Joi.string.max(50),
        ciudad: Joi.string().min(5).max(10).required(),
        recompensa: Joi.number().required(),
        puntos: Joi.array().required
        
    };

    return Joi.validate(route, schema);
}

exports.Route = Route;
exports.validate = validate;