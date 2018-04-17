'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MessageSchema = new Schema({

	'idchat': String,
	'message': String,
	'create': new Date()

});

mongoose.model('Message', MessageSchema);