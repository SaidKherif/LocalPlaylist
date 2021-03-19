const router = require('express').Router();

const { registerUserService } = require('../services/RegisterServices');

router.post('/register', registerUserService);

module.exports = router;
