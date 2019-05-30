const StellarSdk = require('stellar-sdk');
const fetch = require('node-fetch');
const { Account } = require('../models/account');
const StellarHelper = require('../helpers/stellar');

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

exports.sendTransaction = async function (req, res) {
    let result = StellarHelper.sendPayment(req.body.source_account, req.body.target_account, req.params.recompensa);
    if (!result) {
        return res.status(400).json({
            error: "error in payment"
        });
    }
    return res.status(200).json({
        message: "payment completed"
    });
};

exports.getTransaction = function (req, res) {

};

exports.createAccount = async function (req, res) {
    const pair = StellarSdk.Keypair.random();
    pair.secret();
    pair.publicKey();

    try {
        const response = await fetch(
            `https://friendbot.stellar.org?addr=${encodeURIComponent(pair.publicKey())}`
        );
        await response.json();

        await Account.updateOne({
            id: req.token.id,
            stellarAccountId: pair.publicKey()
        });

        return res.status(201).send({
            'publicKey': pair.publicKey(),
            'secretKey': pair.secret()
        });
    } catch (e) {
        return res.status(500).send('Error creating account: ' + e);
    }
};

exports.getAccount = async function (req, res) {
    try {
        const account = await server.loadAccount(req.params.accountid);
        return res.status(200).send(account);
    } catch (e) {
        return res.status(500).send('Error getting account: ' + e);
    }
};

exports.getAccountTransactionHistory = async function (req, res) {

};