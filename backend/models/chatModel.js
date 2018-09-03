'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ChatSchema = new Schema({
	'contract': [{ type: Schema.Types.ObjectId, ref: 'Contract' }],
	'user': [{ type: Schema.Types.ObjectId, ref: 'User' }],
	'text': String,
	//Boolean
	// 0 => user chats
	// 1 => system chat
	'status': Boolean,
	'create': Date
});

module.exports = mongoose.model('Chat', ChatSchema);