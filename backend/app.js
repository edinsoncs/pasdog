'use strict'


//Import framework MVC expressjs -> Ultimate
const express  = require('express');
const path = require('path');
const bodyParser  = require('body-parser');
const cookieParser = require('cookie-parser');


//Import database no-sql
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const monk = require('monk');
const db = monk('localhost:27017/pasdog');


//Import jwt
const jsonwebtoken = require("jsonwebtoken");


//Other imports
const User = require('./models/userModel');

//Create routes
let api = require('./routes/api');



let app = express();


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


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', api);



app.listen(3000, () => {

	console.log('run server in nodejs -> pasdog');

});