const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const beaconsController = require('../controllers/beacons');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

router.post('/', isAuthenticated, beaconsController.create);
router.get('/:id', isAuthenticated, beaconsController.get);
router.get('/', isAuthenticated, beaconsController.getAll);
router.put('/:id', isAuthenticated, isAdmin, beaconsController.update);
router.delete('/:id', isAuthenticated, isAdmin, beaconsController.delete);

router.post('/validate/:name', isAuthenticated, beaconsController.validate);

module.exports = router;