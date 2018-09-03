'use strict';

var ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Chat = mongoose.model('Chat');
const database = require('../../database/queries');
const message = require('../../helps/message');

//NPM MODULES
let shortid = require('shortid');

module.exports.newmessage = (req, res, next, data) => {

	var data = {
		'contract': ObjectId(req.body.contract),
		'user': req.user._id,
		'text': req.body.message,
		'status': 0,
		'create': new Date()

	}

	let chat_save = new Chat(data);

	var save = chat_save.save((err, done) => {
		if(err) return err;

		res.json(done);

	});

}

module.exports.listmessage = (req, res, next) => {

	let chats = database.query(req, 'chats');

	chats.find({'contract': ObjectId(req.body.idcontract) }, (err, data) => {
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