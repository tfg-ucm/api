const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const accountsController = require('../controllers/accounts');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

router.post('/', accountsController.create);
router.get('/:id', isAdmin, accountsController.get);
router.put('/:id', isAuthenticated, accountsController.update);
router.delete('/:id', isAuthenticated, accountsController.delete);

module.exports = router;