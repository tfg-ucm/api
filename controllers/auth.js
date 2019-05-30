const { passwordMatch, generateToken } = require('../helpers/security');
const { Account, validate } = require('../models/account');

exports.login = async function (req, res) {
    let account = await Account.findOne({ email: req.body.email });
    if (!account) return res.status(401).send('Invalid login data');

    let match = await passwordMatch(req.body.password, account.hash);
    if (!match) return res.status(401).send('Invalid login data');

    let token = generateToken({ account_id: account._id });
    return res.status(200).send({ 
            token: token, 
            id: account._id, 
            role: account.userType 
        }
    );
};

exports.logout = function (req, res) {
    // TODO eliminar sesion del almacen
};