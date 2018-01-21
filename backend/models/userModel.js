'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


let UserSchema = new Schema({


	username: String,
	name: String,
	social: String,
	surname: String,
	email: String,
	password: String,
	role: Boolean,
	avatar: String,
	city: String,
	create: Date

});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model('User', UserSchema);