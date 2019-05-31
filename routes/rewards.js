const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');
const rewardsController = require('../controllers/rewards');

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

router.post('/', isAuthenticated, isAdmin, rewardsController.create);
router.get('/:id', isAuthenticated, rewardsController.get);
router.get('/hostelero/:id', isAuthenticated, rewardsController.getHostelero);
router.get('/:id_user', isAuthenticated, rewardsController.getAll);
router.put('/:id', isAuthenticated, isAdmin, rewardsController.update);
router.delete('/:id', isAuthenticated, isAdmin, rewardsController.delete);
router.post('/validate', isAuthenticated, rewardsController.validate);
router.post('/claim/:name', isAuthenticated, rewardsController.claim);

module.exports = router;