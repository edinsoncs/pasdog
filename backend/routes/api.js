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


let socket_conect = require('../socket/init');


//import new dog
let newdog = require('../controllers/newdogController');

//import role user
let role = require('../controllers/roleController');


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
		
		res.json({
				user_id: req.user._id,
				user_type: req.user.role,
				name: req.user.name,
				email: req.user.email,
				city: req.user.city,
				geolocation: req.user.geolocation
		});



	} else {
		return userHandlers.userErr(req, res, next);
	}


});

router.post('/profile/role', (req, res, next) => {

	var status = userHandlers.loginRequired(req, res, next);

	if(status) {
		return role.update(req, res, next);

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


router.post('/newdog', (req, res, next) => {

	//#one => route create new dog in collection "listdog"

	var status = userHandlers.loginRequired(req, res, next);

	if(status){

		//find if exist dog
		//create new dog in insert to array in #one
		return newdog.create(req, res, next);

	}  else {

		return userHandlers.userErr(req, res, next);

	}



});


//List users geolocation in real time

router.post('/map', (req, res, next) => {

	var status = userHandlers.loginRequired(req, res, next);

	if(status) {


		


	} else {

		return userHandlers.userErr(req, res, next);

	}



});


module.exports = router;