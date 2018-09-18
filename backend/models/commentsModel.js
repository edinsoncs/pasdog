'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CommentSchema = new Schema({
	'pas': [{ type: Schema.Types.ObjectId, ref: 'User' }],
	'user': [{ type: Schema.Types.ObjectId, ref: 'User' }],
	'text': String,
	'status': Boolean,
	'create': Date
});

module.exports = mongoose.model('Comment', CommentSchema);
