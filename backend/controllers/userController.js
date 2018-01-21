'use strict'

const mongoose = require('mongoose');
const  jwt = require('jsonwebtoken');
const  bcrypt = require('bcrypt');
const  User = mongoose.model('User');


const message = require('../helps/message');

exports.register = (req, res, next) => {


	let db = req.db;
	let users = db.get('users');

	users.find({'email': req.body.email}, (err, data) => {
		
		if(err) {
			return res.status(400).send({
				message: err
			});
		} else {

			continueProcess(data);

		}

	});



	let continueProcess = (status) => {

		 if(status.length) {
		 	
		 	res.json({
		 		message: message('user_exist_es'),
		 		status: 0
		 	});

		 } else {
		 	newProcess();
		 }


	}


	let newProcess = () => {


		if(req.body.name && req.body.email && req.body.city && req.body.password) {

			insertDatabase();
			

		} else {
			return res.status(400).send({
				message: message('user_complet_es'),
				status: 0
			});
		}


	}


	
	let insertDatabase = () => {

		let userNew = new User(req.body);
		userNew.password = bcrypt.hashSync(req.body.password, 10);

		userNew.save((err, user) => {

			if(err) {
				return res.status(400).send({
					message: err
				});
			} else {

				user.hash_password = undefined;
				return res.json(user);

			}

		});

	}




}