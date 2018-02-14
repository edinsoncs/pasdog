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
	let _data = _img.replace(/^data:image\/\w+;base64,/, "");
	let _buf = new Buffer(_data, 'base64');
	let _name = shortid.generate();

	let _url = path.join(__dirname, '..', 'public/', 'gallery/' + _name + '.png');

	fs.writeFile(_url, _buf, (xhr) => {
		if(xhr) return xhr;


		user.findOneAndUpdate({'_id': req.user._id}, {
			$set: {
				'avatar': _url
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
	let _data = _img.replace(/^data:image\/\w+;base64,/, "");
	let _buf = new Buffer(_data, 'base64');
	let _name = shortid.generate();

	let _url = path.join(__dirname, '..', 'public/', 'dogs/' + _name + '.png');

	fs.writeFile(_url, _buf, (xhr) => {
		if(xhr) return xhr;

		listdog.insert({
			name: req.body.name,
			color: req.body.color,
			race: req.body.race,
			age: req.body.age,
			avatar: _url,
			details: req.body.details
		}, (err, success) => {

			if(err) return err;


			return res.status(200).json({ 
				message: message('success_dog_es') 
			});


		});


	});


}