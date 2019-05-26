const { Reward, validate } = require('../models/reward');

exports.create = async function (req, res) {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({
            error: error.details[0].message
        });

        let reward = await Reward.findOne({ name: req.body.name });
        if (reward) return res.status(400).send({
            error: 'reward already exists'
        });

        reward = new Reward({
            name: req.body.name,
            account_id: req.token.account_id
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
        let reward = await Reward.findById(req.params.id);
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
    // Para validar una recompensa se verifica que el usuario
    // ha pasado por todos los puntos que conforman la ruta
    // que quiere validar.
};