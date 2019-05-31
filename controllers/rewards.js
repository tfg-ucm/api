const { Reward, validate } = require('../models/reward');
const { sendPayment } = require('../helpers/stellar');

exports.create = async function (req, res) {
    try {
        /* const { error } = validate(req.body);
        if (error) return res.status(400).send({
            error: error.details[0].message
        }); */

        let reward = await Reward.findOne({ name: req.body.name });
        if (reward) return res.status(400).send({
            error: 'reward already exists'
        });

        reward = new Reward({
            account_id: req.token.account_id,
            hostelero_id: null,
            name: req.body.name,
            ciudad: req.body.ciudad,
            recompensa: req.body.recompensa,
            beacons: req.body.beacons,
            puntosRecompensa: req.body.puntosRecompensa,
            terminada: req.body.terminada,
            canjeada: req.body.canjeada
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
        let reward = await Reward.find({
            "account_id": req.params.id
        });
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

exports.getHostelero = async function (req, res) {
    try {
        let reward = await Reward.find({
            "hostelero_id": req.params.id
        });
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
        let rewards = await Reward.find({
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

exports.update = async function (req, res) {
    try {
        Reward.findOneAndUpdate(
            req.params.id,
            req.body,
            function(err, newReward) {
                if (err) return res.status(500).send({
                    error: 'error updating reward',
                    message: err
                });
                return res.status(200).send({
                    status: 'reward updated'
                });
            }
        );
    } catch (e) {
        return res.status(500).send({
            error: 'error updating reward',
            message: e.message
        });
    }
};

exports.delete = async function (req, res) {
    try {
        let deletedReward = await Reward.findOneAndDelete(req.params.id);
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

exports.validate = async function (req, res) {
    try {
        let reward = await Reward.findOne({
            name: req.body.name
        });
        if (!reward) return res.status(404).send({
            error: 'reward not exists'
        });

        reward.beacons.forEach(function (beacon) {
            if (!beacon.validado) {
                return res.status(400).send({
                    error: 'all beacons must be validated',
                    message: 'all beacons must be validated before validate a reward'
                });
            }
        });

        reward.terminada = true;
        await reward.save();

        sendPayment(reward.account_id, req.body.account_id, reward.recompensa);
        return res.status(200).send(true);
    } catch (e) {
        return res.status(500).send({
            error: 'error validating reward',
            message: e.message
        });
    }
};

exports.claim = async function (req, res) {
    try {
        let reward = await Reward.findOne({
            name: req.params.name
        });
        if (!reward) return res.status(404).send({
            error: 'reward not exists'
        });

        let result = sendPayment(reward.account_id, req.body.hostelero_id, reward.recompensa);
        if (!result) return res.status(400).send({
            error: 'error sending payment for claim reward',
            message: 'error sending payment for claim reward'
        });

        reward.canjeada = true;
        reward.hostelero_id = req.body.hostelero_id;
        await reward.save();

        return res.status(200).send({
            message: 'reward claimed successfully'
        });
    } catch (e) {
        return res.status(500).send({
            error: 'error claiming reward',
            message: e.message
        });
    }
};