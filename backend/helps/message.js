'use strict'


module.exports = (type) => {


 	console.log(type);

	let message = {

		'user_exist_es': 'El email ya existe!',
		'user_complet_es': 'Complete todo los datos'
	
	}


	return message[type];


}