'use strict';

'use strict';
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const database = require('../database/queries');
const message = require('../helps/message');

const User = mongoose.model('User');
const Contract = mongoose.model('Contract');

module.exports = (req, res, next) => {

	let co = new Contract(req.body);

	co.save((err, success) => {

		if(err) return err;

		console.log(success);


	});

}