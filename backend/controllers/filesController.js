'use strict'

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

//NPM MODULES
let shortid = require('shortid');



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