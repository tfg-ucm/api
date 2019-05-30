const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const routesController = require('../controllers/routes');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

router.post('/', isAuthenticated, routesController.create);
router.get('/:id', isAuthenticated, routesController.get);
router.get('/', isAuthenticated, routesController.getAll);
router.put('/:id', isAuthenticated, isAdmin, routesController.update);
router.delete('/:id', isAuthenticated, isAdmin, routesController.delete);

module.exports = router;