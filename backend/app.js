'use strict'


//Import framework MVC expressjs -> Ultimate
const express  = require('express');
const path = require('path');
const bodyParser  = require('body-parser');
const cookieParser = require('cookie-parser');

let app = express();


//Import database no-sql
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const monk = require('monk');
const db = monk('localhost:27017/pasdog');


//Import jwt
const jsonwebtoken = require("jsonwebtoken");




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {

 if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
 	
 	jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'p4stx!d39xz<!ag', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
      
    });

 } else {
 	req.user = undefined;
    next();
 }
 

});



//Other imports
const User = require('./models/userModel');

require('./models/dogModel');

//Create routes
let api = require('./routes/api');




app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});

mongoose.connect('mongodb://localhost:27017/pasdog', function(err, res) {
    if (err) throw err;
    console.log('MONGOOSE');
});

app.use(function(req, res, next) {
    req.db = db;
    next();
});







app.use('/api', api);



app.listen(3000, () => {

	console.log('run server in nodejs -> pasdog');

});