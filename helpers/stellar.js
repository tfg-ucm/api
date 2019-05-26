const StellarSdk = require('stellar-sdk');
const fetch = require('node-fetch');
const { Account } = require('../models/account');

exports.createStellarAccount = async function (account) {
    const pair = StellarSdk.Keypair.random();

    try {
        const response = await fetch(
            `https://friendbot.stellar.org?addr=${encodeURIComponent(pair.publicKey())}`
        );
        await response.json();

        account.stellarPublic = pair.publicKey();
        account.stellarSecret = pair.secret();
    } catch (e) {
        return res.status(500).send('Error creating account: ' + e);
    }
};