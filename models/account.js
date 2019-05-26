const Joi = require('joi');
const mongoose = require('mongoose');

const Account = mongoose.model('Account', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    hash: {
        type: String,
        required: true,
        minlength: 60,
        maxlength: 60
    },
    stellarSecret: {
        type: String,
        required: false,
        minlength: 56,
        maxlength: 56
    },
    stellarPublic: {
        type: String,
        required: false,
        minlength: 56,
        maxlength: 56
    },
    userType: {
        type: String,
        required: true
    }
}));

function validate(account) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        stellarSecret: Joi.string().min(56).max(56),
        stellarPublic: Joi.string().min(56).max(56),
        userType: Joi.string().required()
    };

    return Joi.validate(account, schema);
}

exports.Account = Account;
exports.validate = validate;