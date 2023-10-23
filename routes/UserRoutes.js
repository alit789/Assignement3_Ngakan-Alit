const UserController = require('../controllers/UserControler');
const router = require('express').Router();

router.get('/', UserController.getUsers);
router.post('/login', UserController.login);
router.post('/register', UserController.register);

module.exports = router;