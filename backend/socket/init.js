'use strict'

module.exports = (io) => {

	io.on('connection', (client, username) => {

		console.log('socket active in time real');

	});


}