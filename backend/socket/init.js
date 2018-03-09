'use strict'

var users = [];  



module.exports.connect = (io) => {


	io.on('connection', (client, username) => {
        
		client.on('set-nickname', (user) => {
			console.log('conectado');

			client.handshake.id = user.id;
			users.push(user);
			updateClients();

		});

		client.on('disconnect', function () {
			console.log('desconectado');
	        
	        for(var i = 0; i < users.length; i++) {

	        	if(users[i].id == client.handshake.id) {
	        		console.log('borrado');
	        		delete users[i];
	        	}


	        }

	        updateClients(); 
	    });


		
		function updateClients() {	

	        io.sockets.emit('listmap', users);
	    }
		

	});


}

