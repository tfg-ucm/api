const { Route, validate } = require('../models/route');

exports.create = async function (req, res) {
    try {
        /* const { error } = validate(req.body);
        if (error) return res.status(400).send({
            error: error.details[0].message
        }); */

        let route = await Route.findOne({ name: req.body.name });
        if (route) return res.status(400).send({
            error: 'route already exists'
        });

        route = new Route({
            account_id: req.body.account_id,
            name: req.body.name,
            ciudad: req.body.ciudad,
            descripcion: req.body.descripcion,
            recompensa: req.body.recompensa,
            puntos: req.body.puntos
        });

        await route.save();
        res.status(201).send(route);
    } catch (e) {
        return res.status(500).send({
            error: 'error creating route',
            message: e.message
        });
    }
};

exports.get = async function (req, res) {
    try {
        let route = await Route.findById(req.params.id);
        if (!route) return res.status(404).send({
            error: 'route not exists'
        });
        return res.status(200).send(route);
    } catch (e) {
        return res.status(500).send({
            error: 'error getting route',
            message: e.message
        });
    }
};

exports.getAll = async function (req, res) {
    try {
        let route = await Route.find({});
        if (!route) return res.status(404).send({
            error: 'no routes'
        });
        return res.status(200).send(route);
    } catch (e) {
        return res.status(500).send({
            error: 'error getting routes',
            message: e.message
        });
    }
};

exports.update = async function (req, res) {
    try {
        Route.findOneAndUpdate(
            {"_id": req.body.id},
            req.body,
            function(err, newRoute) {
                if (err) return res.status(500).send({
                    error: 'error updating route',
                    message: err
                });
                return res.status(200).send({
                    message: 'route updated'
                });
            }
        );
    } catch (e) {
        return res.status(500).send({
            error: 'error updating route',
            message: e.message
        });
    }
};

exports.delete = async function (req, res) {
    try {
        let deletedRoute = await Route.findOneAndDelete({"_id": req.body.id});
        if (deletedRoute) return res.status(204).send({
            message: 'route deleted'
        });
        return res.status(404).send({
            error: 'route not exists'
        });
    } catch (e) {
        return res.status(500).send({
            error: 'error deleting route',
            message: e.message
        });
    }
};