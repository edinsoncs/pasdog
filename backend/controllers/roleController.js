'use strict'

const fs = require('fs');
const path = require('path');
const message = require('../helps/message');

module.exports.update = (req, res, next) => {


	let user = database.query(req, 'users');
	let role = req.body.type;

	if(role == 0 || role == 1) {

		user.findOneAndUpdate({'_id': req.user._id}, {
			$set:{
				role: role
			} 
		}, (err, data) => {

			if(err) return err;

			res.json({'role': role});


		});

	} else {

		res.status(400).
		send({
			message: message('user_role_es')
		})

	}


}