const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const rewardPointsController = require('../controllers/rewardPoints');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

router.post('/', isAuthenticated, isAdmin, rewardPointsController.create);
router.get('/:id', isAuthenticated, rewardPointsController.get);
router.get('/', isAuthenticated, rewardPointsController.getAll);
router.put('/:id', isAuthenticated, isAdmin, rewardPointsController.update);
router.delete('/:id', isAuthenticated, isAdmin, rewardPointsController.delete);

module.exports = router;