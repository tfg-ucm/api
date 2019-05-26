const { Account, validate } = require('../models/account');
const { generateHash } = require('../helpers/security');
const { createStellarAccount } = require('../helpers/stellar');

exports.create = async function (req, res) {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({
            error: error.details[0].message
        });

        let account = await Account.findOne({ email: req.body.email });
        if (account) return res.status(400).send({
            error: 'account already exists'
        });

        account = new Account({
            name: req.body.name,
            email: req.body.email,
            hash: await generateHash(req.body.password),
            userType: req.body.userType
        });

        await createStellarAccount(account);
        await account.save();
        res.status(201).send(account);
    } catch (e) {
        return res.status(500).send({
            error: 'error creating account',
            message: e.message
        });
    }
};

exports.get = async function (req, res) {
    try {
        let account = await Account.findById(req.params.id);
        if (!account) return res.status(404).send({
            error: 'account not exists'
        });
        return res.status(200).send(account);
    } catch (e) {
        return res.status(500).send({
            error: 'error getting account',
            message: e.message
        });
    }
};

exports.update = async function (req, res) {
    try {
        req.body.hash = await generateHash(req.body.password);
        Account.findOneAndUpdate(
            req.params.id,
            req.body,
            function (err, newAccount) {
                if (err) return res.status(500).send({ error: err });
                return res.status(200).send({
                    message: 'account updated'
                });
            }
        );
    } catch (e) {
        return res.status(500).send({
            error: 'error updating account',
            message: e.message
        });
    }
};

exports.delete = async function (req, res) {
    try {
        let deletedAccount = await Account.findOneAndDelete(req.params.id);
        if (deletedAccount) return res.status(204).send({
            status: 'account deleted'
        });
        return res.status(404).send({
            error: 'account not exists'
        });
    } catch (e) {
        return res.status(500).send({
            error: 'error deleting account',
            message: e.message
        });
    }
};