const StellarSdk = require('stellar-sdk');
const fetch = require('node-fetch');
const { Account } = require('../models/account');

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

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

exports.sendPayment = async function (sourceAccountID, destinationAccountID, amount) {
    let sourceAccount = await Account.findById(sourceAccountID);
    if (!sourceAccount) return new Error("Source account not found.");

    const sourceKeyPair = StellarSdk.Keypair.fromSecret(sourceAccount.stellarSecret);
    const sourcePublicKey = sourceKeyPair.publicKey();

    let destinationAccount = await Account.findById(destinationAccountID);
    if (!destinationAccount) return new Error("Source account not found.");

    const destinationKeyPair = StellarSdk.Keypair.fromSecret(destinationAccount.stellarSecret);
    const destinationPublicKey = destinationKeyPair.publicKey();

    StellarSdk.Network.useTestNetwork();

    const account = await server.loadAccount(sourcePublicKey);
    const fee = await server.fetchBaseFee();

    let aux = amount + ".0000000";

    const transaction = new StellarSdk.TransactionBuilder(account, { fee })
        .addOperation(StellarSdk.Operation.payment({
            destination: destinationPublicKey,
            asset: StellarSdk.Asset.native(),
            amount: aux,
        }))
        .setTimeout(30)
        .build();

    transaction.sign(sourceKeyPair);

    try {
        await server.submitTransaction(transaction);
        return true;
    } catch (e) {
        return e;
    }
};