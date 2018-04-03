'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({

	'user_id': String,
	'name': String,
	'color': String,
	'race': String,
	'age': { type: Date, default: Date.now },
	'avatar': String,
	'details': String,
	'size': Number,
	'weight': Number

});

mongoose.model('Dog', UserSchema);