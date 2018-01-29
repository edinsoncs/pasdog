'use strict'

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


//NPM MODULES
let shortid = require('shortid');


let userHandlers = require('../controllers/userController');

//router.post(userHandlers.register);

router.post('/newuser', (req, res, next) => {

	return userHandlers.register(req, res, next);

});

router.post('/access', (req, res, next) => {

	return userHandlers.access_email(req, res, next);

});

router.post('/profile', (req, res, next) => {

	var status = userHandlers.loginRequired(req, res, next);


	if(status) {

		let db = req.db;
		let user = db.get('users');


		user.findOne({'_id': req.user._id}, (err, data) => {
			if(err) return err;

			res.json({
				id: data._id,
				name: data.name,
				email: data.email,
				city: data.city
			});

		});


	} else {
		return userHandlers.userErr(req, res, next);
	}


});


router.post('/profile/saveimage', (req, res, next) => {


	var status = userHandlers.loginRequired(req, res, next);

	if(status) {

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
		

	} else {
		return userHandlers.userErr(req, res, next);
	}
	


});


module.exports = router;