'use strict'

module.exports = (io) => {


	io.on('connection', (client, username) => {

		console.log('socket active in time real');

		client.on('set-nickname', (data) => {

			//con esto verifico si llego la data que me enviastes :D

			console.log(data);


		})

	});


}