const Joi = require('joi');
const mongoose = require('mongoose');

const Transaction = mongoose.model('Reward', new mongoose.Schema({
    source_account: {
        type: String,
        minlegth: 24,
        maxlength: 24,
        required: true
    },
    target_account: {
        type: String,
        minlegth: 24,
        maxlength: 24,
        required: true
    },
    recompensa: {
        type: String,
        required: true,
        minlegth: 10,
        maxlength: 10
    }
}));

function validate(transaction) {
    const schema = {
        source_account: Joi.string().min(24).max(24).required(),
        target_account: Joi.string().min(24).max(24).required(),
        recompensa: Joi.string().min(10).max(10).required()
    };

    return Joi.validate(transaction, schema);
}

exports.Transaction = Transaction;
exports.validate = validate;