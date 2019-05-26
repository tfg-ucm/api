const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;