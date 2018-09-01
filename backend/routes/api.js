'use strict'

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


//NPM MODULES
let shortid = require('shortid');

let controllers = require('../controllers/initController');


let userHandlers = require('../controllers/userController');
let files = require('../controllers/filesController');

//router.post(userHandlers.register);

let socket_conect = require('../socket/init');


//import new dog
let newdog = require('../controllers/newdogController');

//import role user
let role = require('../controllers/roleController');

//import chat
let chat = require('../controllers/chatController');


router.post('/newuser', (req, res, next) => {

	return controllers.ctr('register', req, res, next);

});

router.post('/access', (req, res, next) => {

	return controllers.ctr('login', req, res, next);
});


router.post('/profile', (req, res, next) => {

	var status = userHandlers.loginRequired(req, res, next);

	if(status) {
		return controllers.ctr('profile', req, res, next);
	} else {
		return userHandlers.userErr(req, res, next);
	}

});


router.post('/getprofile', (req, res, next) => {

	var status = userHandlers.loginRequired(req, res, next);

	if(status) {
		return controllers.ctr('getprofile', req, res, next);
	} else {
		return userHandlers.userErr(req, res, next);
	}

});



router.post('/profile/role', (req, res, next) => {

	var status = userHandlers.loginRequired(req, res, next);

	if(status) {
		return controllers.ctr('role', req, res, next);

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



router.post('/updateprofile', (req, res, next) => {

	var status = userHandlers.loginRequired(req, res, next);

	if(status) {
		return controllers.ctr('updateprofile', req, res, next);
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
		//return newdog.create(req, res, next);
		return controllers.ctr('dog_new', req, res, next);



	}  else {

		return userHandlers.userErr(req, res, next);

	}

});


router.post('/listdog', (req, res, next) => {

	//#one => route create list dog in collection "listdog"

	var status = userHandlers.loginRequired(req, res, next);

	if(status){

		//list dog in user related collections
		return newdog.list(req, res, next);

	}  else {

		return userHandlers.userErr(req, res, next);

	}

});


router.post('/updatedog', (req, res, next) => {

	/**
	* UPDATE DOG
	* {req to id dog}
	*/
	var status = userHandlers.loginRequired(req, res, next);

	if(status){

		//list dog in user related collections
		return newdog.update(req, res, next);

	}  else {

		return userHandlers.userErr(req, res, next);

	}

});


router.post('/deletedog', (req, res, next) => {


	/**
	* REMOVE DOG IN THE COLLECTION LISTDOG´
	* {req to id dog}
	*/
	var status = userHandlers.loginRequired(req, res, next);

	if(status){
		//list dog in user related collections
		return newdog.remove(req, res, next);
	}  else {
		return userHandlers.userErr(req, res, next);

	}


});


router.post('/onelist', (req, res, next) => {


	/**
	* REMOVE DOG IN THE COLLECTION LISTDOG´
	* {req to id dog}
	*/
	var status = userHandlers.loginRequired(req, res, next);

	if(status){
		//list dog in user related collections
		return newdog.onelist(req, res, next);
	}  else {
		return userHandlers.userErr(req, res, next);

	}


});


router.post('/updatedog/photo', (req, res, next) => {

	/**
	* UPDATE DOG PHOTO
	* {req to id dog}
	*/
	var status = userHandlers.loginRequired(req, res, next);

	if(status){

		//list dog in user related collections
		return newdog.updatePhoto(req, res, next);

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

router.post('/profile/paseador', (req, res, next) => {

	var status = userHandlers.loginRequired(req, res, next);

	if(status) {

		return userHandlers.completPaseador(req, res, next);

	} else {

		return userHandlers.userErr(req, res, next);

	}


});


router.post('/chat', (req, res, next) => {

	var status = userHandlers.loginRequired(req, res, next);

	if(status) {

		return chat.open(req, res, next);

	} else {

		return userHandlers.userErr(req, res, next);

	}

});


router.post('/newcontract', (req, res, next) => {

	var status = userHandlers.loginRequired(req, res, next);

	if(status) {

		return controllers.ctr('contract_new', req, res, next);

	} else {

		return userHandlers.userErr(req, res, next);

	}

});


router.post('/listcontract', (req, res, next) => {

	var status = userHandlers.loginRequired(req, res, next);

	if(status) {

		return controllers.ctr('listcontract', req, res, next);

	} else {

		return userHandlers.userErr(req, res, next);

	}

});






module.exports = router;