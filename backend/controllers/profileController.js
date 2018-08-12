'use strict';
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const database = require('../database/queries');
const message = require('../helps/message');

const User = mongoose.model('User');
module.exports = (req, res, next) => {

	let user = database.query(req, 'users');

	user.findOne({'_id': req.user._id}, (err, data) => {
			if(err) return err;

			var show = [
			{'data': 
				{user_id: data._id,
			    user_type: data.role, 
			    name: data.name, 
			    geolocation: data.geolocation,
				email: data.email, 
				date: data.create, 
				city: data.city,
				avatar: data.avatar
				}
			}]

			res.json(show);

	});


}



