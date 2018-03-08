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
	        	console.log(users[i].id);
	        	console.log(client.id);
	            if(users[i].id == client.id) {
	            	console.log('entre');
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

