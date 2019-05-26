const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const serviceController = require('../controllers/service');
const { isAdmin, isAuthenticated } = require('../middlewares/auth');

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

router.get('/info', isAuthenticated, serviceController.info);

module.exports = router;