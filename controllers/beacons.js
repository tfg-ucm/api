const { Beacon, validate } = require('../models/beacon');
const { Reward } = require('../models/reward');

exports.create = async function (req, res) {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({
            error: error.details[0].message
        });

        let beacon = await Beacon.findOne({ name: req.body.name });
        if (beacon) return res.status(400).send({
            error: 'beacon already exists'
        });

        beacon = new Beacon({
            account_id: req.body.account_id,
            name: req.body.name,
            longitud: req.body.longitud,
            latitud: req.body.latitud,
            ciudad: req.body.ciudad,
            ruta: req.body.ruta
        });

        await beacon.save();
        res.status(201).send(beacon);
    } catch (e) {
        return res.status(500).send({
            error: 'error creating beacon',
            message: e.message
        });
    }
};

exports.get = async function (req, res) {
    try {
        let beacon = await Beacon.findById(req.params.id);
        if (!beacon) return res.status(404).send({
            error: 'beacon not exists'
        });
        return res.status(200).send(beacon);
    } catch (e) {
        return res.status(500).send({
            error: 'error getting beacon',
            message: e.message
        });
    }
};

exports.getAll = async function (req, res) {
    try {
        let beacons = await Beacon.find({
            //account_id: req.token.account_id
        });
        if (!beacons) return res.status(404).send({
            error: 'this account has no beacons'
        });
        return res.status(200).send(beacons);
    } catch (e) {
        return res.status(500).send({
            error: 'error getting beacons',
            message: e.message
        });
    }
};

exports.getByCiudad = async function (req, res) {
    try {
        let beacons = await Beacon.find({
            ciudad: req.params.ciudad
        });
        if (!beacons) return res.status(404).send({
            error: 'no beacons found in this city'
        });
        return res.status(200).send(beacons);
    } catch (e) {
        return res.status(500).send({
            error: 'error getting beacons',
            message: e.message
        });
    }
};

exports.getByRuta = async function (req, res) {
    try {
        let beacons = await Beacon.find({
            ruta: req.params.ruta
        });
        if (!beacons) return res.status(404).send({
            error: 'no beacons found within this route'
        });
        return res.status(200).send(beacons);
    } catch (e) {
        return res.status(500).send({
            error: 'error getting beacons',
            message: e.message
        });
    }
};

exports.update = async function (req, res) {
    try {
        Beacon.findOneAndUpdate(
            {"_id": req.body.id},
            req.body,
            function(err, newBeacon) {
                if (err) return res.status(500).send({ 
                    error: 'error updating beacon',
                    message: err
                 });
                return res.status(200).send({
                    message: 'beacon updated'
                });
            }
        );
    } catch (e) {
        return res.status(500).send({
            error: 'error updating beacon',
            message: e.message
        });
    }
};

exports.delete = async function (req, res) {
    try {
        let deletedBeacon = await Beacon.findOneAndDelete({"_id": req.body.id});
        if (deletedBeacon) return res.status(204).send({
            message: 'beacon deleted'
        });
        return res.status(404).send({
            error: 'beacon not exists'
        });
    } catch (e) {
        return res.status(500).send({
            error: 'error deleting beacon',
            message: e.message
        });
    }
};

exports.validate = async function (req, res) {
    try {
        let reward = await Reward.findOne({
            name: req.body.reward
        });
        if (!reward) return res.status(400).send({error: 'reward not exists'});

        reward.beacons.forEach(function (beacon) {
            if (beacon.name === req.body.beacon) {
                beacon.validado = true;
            }
        });
        await reward.save();
        return res.status(200).send(reward);
    } catch (e) {
        return res.status(500).send({
            error: 'error validating beacon',
            message: e.message
        });
    }
};