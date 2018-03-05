'use strict'


//Import framework MVC expressjs -> Ultimate
const express  = require('express');
const path = require('path');
const bodyParser  = require('body-parser');
const cookieParser = require('cookie-parser');


let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let socket_conect = require('./socket/init');

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
    if (err)req.user = undefined;
      req.user = decode;
      next();
      
    });

 } else {
  console.log('llego aqui');
 	req.user = undefined;
    next();
 }
 

});



//Other imports
const User = require('./models/userModel');

require('./models/dogModel');

socket_conect.connect(io);

//Create routes
let api = require('./routes/api');




app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
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




server.listen(3000, () => {

	console.log('run server in nodejs -> pasdog');

});