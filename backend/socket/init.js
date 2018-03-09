'use strict'

var users = {}  



module.exports.connect = (io) => {


	io.on('connection', (client, username) => {
        
		client.on('set-nickname', (user) => {
			console.log('conectado');

			client.handshake.name = user.name;
			users[user.name] = user;
			updateClients();

		});

		client.on('disconnect', function () {
			
			delete users[client.handshake.name];
	        updateClients(); 
	    });


		
		function updateClients() {	

			console.log(users);

	        io.sockets.emit('listmap', users);
	    }
		

	});


}

