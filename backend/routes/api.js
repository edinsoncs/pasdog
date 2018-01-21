'use strict'

const express = require('express');
const router = express.Router();

let userHandlers = require('../controllers/userController');

//router.post(userHandlers.register);

router.post('/newuser', (req, res, next) => {

	return userHandlers.register(req, res, next);

});


module.exports = router;