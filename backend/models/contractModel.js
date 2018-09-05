'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ContractSchema = new Schema({
	'pas_id': [{ type: Schema.Types.ObjectId, ref: 'User' }],
	'user_id': [{ type: Schema.Types.ObjectId, ref: 'User' }],
	'dog_ids': [ Schema.Types.ObjectId ],


	/** Status in contract */

	//0 => pending
	//1 => active
	//2 => inactive
	//3 => cancel
	//4 => finish
	'status': Number,
	
	'create': Date
});



mongoose.model('Contract', ContractSchema);