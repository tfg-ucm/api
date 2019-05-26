const { Account } = require('../models/account');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.generateHash = async (password) => {
    let salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
};

exports.generateToken = function (tokenData) {
    return jwt.sign(
        tokenData,
        ( process.env.API_KEY || 'secretWord' ),
        { expiresIn: 60*60*24 }
    );
};

exports.passwordMatch = async function (password, hash) {
    return bcrypt.compare(password, hash);
};