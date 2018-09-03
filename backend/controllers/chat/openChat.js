'use strict';

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Chat = mongoose.model('Chat');
const message = require('../../helps/message');

//NPM MODULES
let shortid = require('shortid');

module.exports = (req, res, next, data) => {


	var data = {
		'contract': data._id,
		'text': message('success_new_contract_open_chat') ,
		'status': 1,
		'create': new Date()

	}

	let chat_save = new Chat(data);

	var save = chat_save.save((err, done) => {
		if(err) return err;
	});

	return true;


}