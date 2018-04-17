'use strict'

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

//NPM MODULES
let shortid = require('shortid');
const message = require('../helps/message');

/**
 * Import module Chat
*/

var Chat = require('../models/chatModel');

module.exports.open = (req, res, next) => {


	/**
	 * Find to exist chat or continue
	*/

	Chat.findOne({'user_open': req.user._id}, (err, chat) => {
		if(err) return err;
		
		console.log(chat);

	});


}