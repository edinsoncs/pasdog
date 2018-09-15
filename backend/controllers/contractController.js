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



//Show all contracts
module.exports.listcontract = (req, res, next) => {


	let contracts = database.query(req, 'contracts');
	let user = database.query(req, 'User');


	//Find contracts is Array return array
	contracts.find({'user_id': ObjectId(req.user._id) }, 

		{"sort" : ['create', 'ASC']}, 

		(err, data) => {
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

module.exports.opencontract = (req, res, next) => {


	let contracts = database.query(req, 'contracts');

	contracts.findOne({'id': ObjectId(req.body.idcontract) }, (err, data) => {
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