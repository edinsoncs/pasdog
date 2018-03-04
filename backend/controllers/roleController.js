'use strict'

const fs = require('fs');
const path = require('path');
const message = require('../helps/message');

module.exports.update = (req, res, next) => {


	let db = req.db;
	let user = db.get('users');
	let role = req.body.type;


	if(role) {

		user.findOneAndUpdate({'_id': req.user._id}, {
			$set:{
				role: role
			} 
		}, (err, data) => {

			if(err) return err;

			res.json({'role': role});


		});

	} else  {

		user.findOneAndUpdate({'_id': req.user._id}, {
			$set:{
				role: role
			} 
		}, (err, data) => {

			if(err) return err;

			res.json({'role': role});


		});

	}

}