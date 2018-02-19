'use strict'

module.exports = (io) => {


	io.on('connection', (client, username) => {

		console.log('socket active in time real');

		client.on('set-nickname', (data) => {

			//con esto verifico si llego la data que me enviastes :D

			console.log(data);


		});

		client.emit('message', (data) => {

			message: 'Che esto es en tiempo real. la idea es hacer un input y escribir en ello y que envie la data lo que se escriba esto es manual este texto'

		});

	});


}