const jwt = require('jsonwebtoken');

exports.isAuthenticated = function (req, res, next) {
    let token = req.headers['authorization'];
    if (!token) return res.status(401).send({ error: 'Unauthorized request' });

    token = token.replace('Bearer ', '');
    jwt.verify(token, ( process.env.API_KEY || 'secretWord' ), function(err, decodedToken) {
        if (err) return res.status(401).send({ error: 'Unauthorized request' });
        req.token = decodedToken;
        req.body.account_id = decodedToken.account_id;
        next();
    });
};

exports.isAdmin = function (req, res, next) {
    next();
};

exports.isHostelero = function (req, res, next) {
    next();
};

exports.isInstitucion = function (req, res, next) {
    next();
};