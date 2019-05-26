const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const stellarController = require('../controllers/stellar');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

router.post('/transactions', isAuthenticated, stellarController.sendTransaction);
router.get('/transactions/:id', isAuthenticated, stellarController.getTransaction);
router.post('/accounts', isAuthenticated, stellarController.createAccount);
router.get('/accounts/:accountid', isAuthenticated, stellarController.getAccount);
router.get('/accounts/:id', isAuthenticated, stellarController.getAccountTransactionHistory);

module.exports = router;