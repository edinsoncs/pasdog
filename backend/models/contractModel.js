'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ContractSchema = new Schema({
	'pas_id': [{ type: Schema.Types.ObjectId, ref: 'User' }],
	'req_id': [{ type: Schema.Types.ObjectId, ref: 'User' }],
	'create': Date
});

mongoose.model('Contract', ContractSchema);