const { Transaction, validate } = require('../models/transaction');

exports.create = async function (req, res) {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({
            error: error.details[0].message
        });

        let reward = await Transaction.findOne({ name: req.body.name });
        if (reward) return res.status(400).send({
            error: 'reward already exists'
        });

        reward = new Transaction({
            account_id: req.token.account_id,
            name: req.body.name,
            ciudad: req.body.ciudad,
            recompensa: req.body.recompensa,
            beacons: req.body.beacons
        });

        await reward.save();
        res.status(201).send(reward);
    } catch (e) {
        return res.status(500).send({
            error: 'error creating reward',
            message: e.message
        });
    }
};

exports.get = async function (req, res) {
    try {
        let reward = await Transaction.findById(req.params.id);
        if (!reward) return res.status(404).send({
            error: 'reward not exists'
        });
        return res.status(200).send(reward);
    } catch (e) {
        return res.status(500).send({
            error: 'error getting reward',
            message: e.message
        });
    }
};

exports.getAll = async function (req, res) {
    try {
        let rewards = await Transaction.find({
            account_id: req.token.account_id
        });
        if (!rewards) return res.status(404).send({
            error: 'this account has no rewards'
        });
        return res.status(200).send(rewards);
    } catch (e) {
        return res.status(500).send({
            error: 'error getting rewards',
            message: e.message
        });
    }
};

exports.delete = async function (req, res) {
    try {
        let deletedReward = await Transaction.findOneAndDelete(req.params.id);
        if (deletedReward) return res.status(204).send({
            message: 'reward deleted'
        });
        return res.status(404).send({
            error: 'reward not exists'
        });
    } catch (e) {
        return res.status(500).send({
            error: 'error deleting reward',
            message: e.message
        });
    }
};