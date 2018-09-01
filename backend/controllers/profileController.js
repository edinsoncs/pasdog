'use strict';
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const database = require('../database/queries');
const message = require('../helps/message');

const User = mongoose.model('User');

module.exports.getprimary = (req, res, next) => {

	let user = database.query(req, 'users');

	user.findOne({'_id': req.user._id}, (err, data) => {
			if(err) return err;

			if(data.role == 1) {

				var show = [
				{'data': 
					{user_id: data._id,
				    user_type: data.role, 
				    name: data.name, 
				    geolocation: data.geolocation,
					email: data.email, 
					date: data.create, 
					city: data.city,
					avatar: data.avatar,
					price: data.price,
					details: data.description
					}
				}]

				res.json(show);

			} else {

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

			}

			

	});

}

module.exports.getprofile = (req, res, next) => {

	let user = database.query(req, 'users');

	user.findOne({'_id': req.body.id}, (err, data) => {
			if(err) return err;

			if(data) {

				res.json(data);

			} else {
				return res.status(200).json({ 
					message: message('not_find_id') 
				});
			}

			

	});


}


module.exports.updateprofile = (req, res, next) => {


	let user_update = database.query(req, 'users');


	if(req.user.role == 0) {

		user_update.findOneAndUpdate({'_id': req.user._id, {

			$set: {
				city: req.body.city,
				email: req.body.email,
				name: req.body.name
			}

		}, (xhr, success) => {

			if(err) return err;

			return res.status(200).json({ 
				message: message('success_update_profile')
			});

		});


	} else {

		user_update.findOneAndUpdate({'_id': req.user._id, {

			$set: {
				city: req.body.city,
				email: req.body.email,
				name: req.body.name,
				price: req.body.price,
				description: req.body.description
			}

		}, (xhr, success) => {

			if(err) return err;

			return res.status(200).json({ 
				message: message('success_update_profile')
			});

		});


	}


	



}

