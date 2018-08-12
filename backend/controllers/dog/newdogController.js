'use strict'

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Dog = mongoose.model('Dog');



//NPM MODULES
let shortid = require('shortid');

const message = require('../../helps/message');
const files = require('../filesController');

module.exports = (req, res, next) => {
	
	if(req.body.name && req.body.color && req.body.race && req.body.age &&
	   req.body.avatar && req.body.details) {

	   	files.savephotodog(req, res, next);

	} else {

		return res.status(401).json({ message: message('fail_dog_complet_es') });
	}


}

