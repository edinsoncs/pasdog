'use strict'

var users = [];  



module.exports.connect = (io) => {


	io.on('connection', (client, username) => {
        
        io.sockets.sockets['nickname'] = client.id;

		client.on('set-nickname', (user) => {

			client.user = user;
			users.push(user);
			updateClients();

		});

		client.on('disconnect', function () {
	        
	        for(var i=0; i< users.length; i++) {
	        	console.log(users[i]);
	        	console.log(client.user);
	            if(users[i] == client.user) {
	                delete users[users[i]];
	            }
	        }
	        updateClients(); 
	    });


		
		function updateClients() {
	        io.sockets.emit('listmap', users);
	    }
		

	});


}

