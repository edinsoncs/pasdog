'use strict'

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');

const message = require('../helps/message');
const database = require('../database/queries');



exports.loginRequired = (req, res, next) => {
	if(req.user) {
		return true;
	} else {
		return false;
	}
}

exports.userErr = (req, res, next) => {

	return res.status(401).json({ message: message('fail_user_es') });

}


/////////////////////////////////////////////

exports.completPaseador = (req, res, next) => {

	let db = req.db;
	let user = db.get('users');

	var price = req.body.price;
	var description = req.body.description;

	if(price && description) {

		user.findOneAndUpdate({'_id': req.user._id}, {

			$set: {
				price: price, 
				description: description
			}

		}, (err, success) => {
			if(err) return err;

			res.status(200).
			send({
				message: message('user_pricepaseador_es')
			});

		});

	} else {

		res.status(400).
			send({
				message: message('user_pricepaseador_error_es')
			});

	}

	

}
