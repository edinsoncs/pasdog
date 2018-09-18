'use strict'

var users = {}  
/*
const getDistance = (lat1, lon1, lat2, lon2) => {
      const rad = (x) => {
        return x*Math.PI/180
      }

      const R = 6378.137, //Radio de la tierra en km
            dLat = rad( lat2 - lat1 ),
            dLong = rad( lon2 - lon1 ),
            a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2),
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)),
            d = R * c

      return d.toFixed(3) //Retorna tres decimales

 */




module.exports.connect = (io) => {


	io.on('connection', (client, username) => {
        
		client.on('set-nickname', (user) => {
			client.handshake.name = user.name;
			users[user.name] = user;
			updateClients();

		});

		client.on('disconnect', function () {
			
			delete users[client.handshake.name];
	        updateClients(); 
	    });


		
		function updateClients() {	
	        io.sockets.emit('listmap', users);
	    }
		

	});


}

