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

	dog.find({user: id}).then((doc) => {

		if(doc) {
			return res.status(200).json({ list: doc });

		} else {
			return res.status(200).json({ message: message('fail_list_dog_not') });
		}

	});

}


module.exports.update = (req, res, next) => {

	let db = req.db;
	let dog = db.get('listdog');

	var dog_id = req.body.dogid;

	if(dog_id) {

		dog.findOneAndUpdate({'_id': dog_id}, {
			$set: {
				name: req.body.name,
				color: req.body.color,
				race: req.body.race,
				age: req.body.age,
				details: req.body.details,
				size: req.body.size,
				body: req.body.weight
			}
		}, (err, success) => {
			if(err) return err;

			return res.status(200).json({ 
				message: message('success_dog_es_update') 
			});

		});

	} else {

		return res.status(400).json({
			message: message('fail_dog_es_update')
		})

	}

}

module.exports.updatePhoto = (req, res, next) => {


	var dog_id = req.body.dogid;

	if(dog_id) {

		/**
		* Send to id dogs
		* {req, res, next, "21231221"}
		*/

		files.updatephotodog(req, res, next, dog_id);

	} else {
		return res.status(400).
		json({
			message: message('fail_dog_es_update_photo')
		});
	}

}


module.exports.onelist = (req, res, next) => {


	var dog_id = req.body.dogid;

	let db = req.db;
	let dog = db.get('listdog');

	if(dog_id) {

		/**
		* Send to id dogs
		* {req, res, next, "21231221"}
		*/

		dog.findOne({'_id': dog_id}, (xhr, done) => {
			if(xhr) return xhr;

			res.json(done);
		});

	} else {
		return res.status(400).
		json({
			message: message('fail_remove_dog_not')
		});
	}


}


module.exports.remove = (req, res, next) => {

	var dog_id = req.body.dogid;

	let db = req.db;
	let dog = db.get('listdog');

	if(dog_id) {

		/**
		* Send to id dogs
		* {req, res, next, "21231221"}
		*/

		dog.remove({'_id': dog_id}, (xhr, done) => {
			if(xhr) return xhr;

			return res.status(200).json({ 
				message: message('success_dog_es_remove') 
			});

		});

	} else {
		return res.status(400).
		json({
			message: message('fail_remove_dog_not')
		});
	}


}





