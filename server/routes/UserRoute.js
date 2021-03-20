const router = require('express').Router();

const { registerUserService } = require('../services/RegisterServices');
const { LoginUserServices } = require('../services/LoginServices');

router.post('/register', registerUserService);
router.post('/login', LoginUserServices);

module.exports = router;
