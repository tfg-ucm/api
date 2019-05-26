const { RewardPoint, validate } = require('../models/rewardPoint');

exports.create = async function (req, res) {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({
            error: error.details[0].message
        });

        let rewardPoint = await RewardPoint.findOne({ name: req.body.name });
        if (rewardPoint) return res.status(400).send({
            error: 'reward point already exists'
        });

        rewardPoint = new RewardPoint({
            account_id: req.body.account_id,
            name: req.body.name,
            description: req.body.description,
            longitud: req.body.longitud,
            latitud: req.body.latitud,
            ciudad: req.body.ciudad
        });

        await rewardPoint.save();
        res.status(201).send(rewardPoint);
    } catch (e) {
        return res.status(500).send({
            error: 'error creating reward point',
            message: e.message
        });
    }
};

exports.get = async function (req, res) {
    try {
        let rewardPoint = await RewardPoint.findById(req.params.id);
        if (!rewardPoint) return res.status(404).send({
            error: 'reward point not exists'
        });
        return res.status(200).send(rewardPoint);
    } catch (e) {
        return res.status(500).send({
            error: 'error getting reward point',
            message: e.message
        });
    }
};

exports.getAll = async function (req, res) {
    try {
        let rewardPoints = await RewardPoint.find({
            account_id: req.token.account_id
        });
        if (!rewardPoints) return res.status(404).send({
            error: 'this account has no reward points'
        });
        return res.status(200).send(rewardPoints);
    } catch (e) {
        return res.status(500).send({
            error: 'error getting reward points',
            message: e.message
        });
    }
};

exports.update = async function (req, res) {
    try {
        RewardPoint.findOneAndUpdate(
            req.params.id,
            req.body,
            function(err, newRewardPoint) {
                if (err) return res.status(500).send({
                    error: 'error updating reward point',
                    message: err
                });
                return res.status(200).send({
                    status: 'reward point updated'
                });
            }
        );
    } catch (e) {
        return res.status(500).send({
            error: 'error updating reward point',
            message: e.message
        });
    }
};

exports.delete = async function (req, res) {
    try {
        let deletedRewardPoint = await RewardPoint.findOneAndDelete(req.params.id);
        if (deletedRewardPoint) return res.status(204).send({
            message: 'reward point deleted'
        });
        return res.status(404).send({
            error: 'reward point not exists'
        });
    } catch (e) {
        return res.status(500).send({
            error: 'error deleting reward point',
            message: e.message
        });
    }
};