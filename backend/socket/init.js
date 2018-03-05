'use strict'

var users = [];  



module.exports.connect = (io) => {


	io.on('connection', (client, username) => {


		client.on('set-nickname', (data) => {

			users.push(data);

		});




		client.emit('message',  {

			message: 'Che esto es en tiempo real. la idea es hacer un input y escribir en ello y que envie la data lo que se escriba esto es manual este texto'

		});

		

	});


}

module.exports.list = (req, res, next) => {


	console.log(users);


}