'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ChatSchema = new Schema({

	/**
	* Array Users Photo, Name, Age, Geo, Etc
	*/

	'user_1': Array,
	'user_2': Array,
	
	//Message related
	'message': String,

	'create': new Date()
	

});

mongoose.model('Chat', ChatSchema);