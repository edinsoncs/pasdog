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
	
	//Price user if "PASEADOR DE MASCOTAS => return number" else "USUARIO NORMAL => return 0"
	price: Number,
	

	//Create user date in moment to register
	create: {type: Date, default: Date.now},


	//Geolocation user position[0] => Latitud and position[1] => longitud
	geolocation: Array

});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model('User', UserSchema);