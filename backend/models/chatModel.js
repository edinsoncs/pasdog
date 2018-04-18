'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ChatSchema = new Schema({
	
	'user_open': String,
	'user_received': String,
	'message': String,
	'create': Date
	

});

module.exports = mongoose.model('Chat', ChatSchema);