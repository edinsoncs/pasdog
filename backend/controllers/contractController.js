'use strict';

'use strict';
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const database = require('../database/queries');
const message = require('../helps/message');
var ObjectId = require('mongodb').ObjectId; 

require('../models/contractModel');

const User = mongoose.model('User');
const Contract = mongoose.model('Contract');
const OpenChat = require('./chat/openChat');

module.exports.newcontract = (req, res, next) => {


	var data = {
		pas_id: req.body.pas_id,
		user_id: req.user._id,
		dog_ids: req.body.dog_ids,
		exclusive: req.body.exclusive,
		price: req.body.price,
		status: 0,
		create: new Date()
	}

	let co = new Contract(data);

	co.save((err, success) => {

		if(err) return err;

		
		if(success) {

			//Open chat

			var chat_status = OpenChat(req, res, next, success); 

			if(chat_status) {

				return res.json(success);

			} else {

				//Not chat open

				return res.status(200).json({ 
						message: message('not_insert_contract') 
				});

			}

			


		} else {
			return res.status(200).json({ 
					message: message('not_insert_contract') 
			});
		}

	});

}

	var paseadores = [];


//Show all contracts
module.exports.listcontract = (req, res, next) => {


	let contracts = database.query(req, 'contracts');
	let user = database.query(req, 'users');


	User.findOne({"_id": req.user._id}).exec((err, data)=> {
		continueList(data.role);
	});

	function continueList(type) {


		if(type) {

			//Find contracts is Array return array
			Contract.find({'pas_id': ObjectId(req.user._id)}).
			populate('dog_ids').
			exec(function (err, dog) {
				if (err){
					return err; 
				}
							
				res.json(dog.reverse());
			});



		} else {

			//Find contracts is Array return array
			Contract.find({'user_id': ObjectId(req.user._id)}).
			populate('pas_id', 'name email avatar').
			exec(function (err, user) {
				if (err){
					return err; 
				}
							
				res.json(user.reverse());
			});

		}


	}





}

module.exports.opencontract = (req, res, next) => {


	let contracts = database.query(req, 'contracts');

	contracts.findOne({'user_id': ObjectId(req.body.idcontract) }, (err, data) => {
			if(err) return err;

			if(data) {

				res.json(data);

			} else {
				return res.status(200).json({ 
					message: message('not_contract_all') 
				});
			}
	});


}