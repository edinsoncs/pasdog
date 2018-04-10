'use strict'

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Dog = mongoose.model('Dog');



//NPM MODULES
let shortid = require('shortid');

const message = require('../helps/message');
const files = require('./filesController');

module.exports.create = (req, res, next) => {
	


	//validation dog in model

	if(req.body.name && req.body.color && req.body.race && req.body.age &&
	   req.body.avatar && req.body.details) {


	   	files.savephotodog(req, res, next);

		//res.json({access: true});

	} else {

		return res.status(401).json({ message: message('fail_dog_complet_es') });
	}




	/* @comment block

	//print in console o shell 
	console.log('insert new dog in profile user: ' + req.user._id);


	//return json in postman
	res.json({'success': req.user._id});*/

}

module.exports.list = (req, res, next) => {


	let db = req.db;
	let dog = db.get('listdog');

	var id = String(req.user._id);


	dog.findOne({user: id}).then((doc) => {

		if(doc) {

			return res.status(200).json({ list: doc });

		} else {
			return res.status(401).json({ message: message('fail_list_dog') });
		}

	});


}









