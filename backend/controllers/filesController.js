'use strict'

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

//NPM MODULES
let shortid = require('shortid');
const message = require('../helps/message');



exports.savephotoprofile = (req, res, next) => {


	let db = req.db;
	let user = db.get('users');


	let _img = req.body.avatar;
	//let _data = _img.replace(/^data:image\/\w+;base64,/, "");
	let _buf = new Buffer(_img, 'base64');
	let _name = shortid.generate() + '.png';

	let _url = path.join(__dirname, '..', 'public/', 'gallery/' + _name);

	fs.writeFile(_url, _buf, (xhr) => {
		if(xhr) return xhr;


		user.findOneAndUpdate({'_id': req.user._id}, {
			$set: {
				'avatar': _name
			}
		}, (err, doc) => {

			if(err) return err;

			res.json({'avatar': _url});

		});

	});

}

exports.savephotodog = (req, res, next) => {


  let db = req.db;
  let listdog = db.get('listdog');


	let _img = req.body.avatar;
	/**
	 * Update 10/08/18
	 */
	//let _data = _img.replace(/^data:image\/\w+;base64,/, "");
	let _buf = new Buffer(_img, 'base64');
	let _name = shortid.generate() + '.png';
	let _url = path.join(__dirname, '..', 'public/', 'dogs/' + _name);

	fs.writeFile(_url, _buf, (xhr) => {
		if(xhr) return xhr;

		listdog.insert({
			user: req.user._id,
			name: req.body.name,
			color: req.body.color,
			race: req.body.race,
			age: req.body.age,
			avatar: _name,
			details: req.body.details,
			size: req.body.size,
			body: req.body.weight
		}, (err, success) => {

			if(err) return err;


			return res.status(200).json({ 
				message: message('success_dog_es') 
			});


		});


	});

}

exports.updatephotodog = (req, res, next, dog_id) => {

	let db = req.db;
  	let listdog = db.get('listdog');

  	let _img = req.body.avatar;
	//let _data = _img.replace(/^data:image\/\w+;base64,/, "");
	let _buf = new Buffer(_img, 'base64');
	let _name = shortid.generate() + '.png';

	if(dog_id) {

		let _url = path.join(__dirname, '..', 'public/', 'dogs/' + _name);

		fs.writeFile(_url, _buf, (xhr) => {
		if(xhr) return xhr;

		
		listdog.findOneAndUpdate({'_id': dog_id}, {
			$set: {
					avatar: _name
			}
		}, (xhr, success) => {
			 if(xhr) return xhr;
			
			 return  res.status(200).
			 					json({
			 						message: message('success_dog_photo_profile')
			 					});

		});


	});


	} else {
		return res.status(400).
			json({ message: message('fail_dog_es_update_photo')
		});
	}



}