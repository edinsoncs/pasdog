'use strict'


require('../models/commentsModel');

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Comment = mongoose.model('Comment');



//NPM MODULES
let shortid = require('shortid');

const Message = require('../helps/message');
const files = require('./filesController');


module.exports.newmessage = (req, res, next) => {

	var data = {
		'pas': req.body.pas,
		'user': req.user._id,
		'text': req.body.message,
		'status': 1,
		'create': new Date()
	}

	let message_save = new Comment(data);

	message_save.save((err, done) => {
		if(err) return err;
		return res.json(done);
	});


}

module.exports.listmessage = (req, res, next) => {

	let comments = database.query(req, 'comment');

	comments.find({'pas': ObjectId(req.body.idpas) }, (err, data) => {
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













