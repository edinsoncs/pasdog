'use strict'

var users = [];  



module.exports.connect = (io) => {


	io.on('connection', (client, username) => {


		client.on('set-nickname', (data) => {

			users.push(data);

		});



		client.emit('listmap',  users);

		

	});


}

module.exports.list = (req, res, next) => {


	console.log(users);


}