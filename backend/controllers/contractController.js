'use strict';

'use strict';
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const database = require('../database/queries');
const message = require('../helps/message');

require('../models/contractModel');

const User = mongoose.model('User');
const Contract = mongoose.model('Contract');

module.exports.newcontract = (req, res, next) => {


	var data = {
		pas_id: req.body.pas,
		user_id: req.user._id,
		dog_ids: req.body.ids,
		status: 0,
		create: new Date()
	}

	let co = new Contract(data);

	co.save((err, success) => {

		if(err) return err;

		
		if(success) {

			return res.json(success);


		} else {
			return res.status(200).json({ 
					message: message('not_insert_contract') 
			});
		}


	});

}

module.exports.listcontract = (req, res, next) => {

	let contracts = database.query(req, 'Contract');

	contracts.find({'_id': req.user._id}, (err, data) => {
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