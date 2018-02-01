'use strict'

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


//NPM MODULES
let shortid = require('shortid');


let userHandlers = require('../controllers/userController');
let files = require('../controllers/filesController');

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
		return files.savephotoprofile(req, res, next);

	} else {
		return userHandlers.userErr(req, res, next);
	}
	


});


module.exports = router;