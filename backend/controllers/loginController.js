'use strict';

'use strict';
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const database = require('../database/queries');
const message = require('../helps/message');

const User = mongoose.model('User');

module.exports = (req, res, next) => {

	User.findOne({
		email: req.body.email
	}, (err, user) => {

		if(err) throw err;


		if (!user || !user.comparePassword(req.body.password)) {
	      return res.status(401).json({ message: message('fail_access_es') });
	    }

		return res.json({
			user_id: user._id,
			user_type: user.role,
			token: jwt.sign({ email: user.email, name: user.name, _id: user._id }, 'p4stx!d39xz<!ag'),
			name: user.name,
			city: user.city,
			email: user.email,
            avatar: user.avatar
		});


	});

}