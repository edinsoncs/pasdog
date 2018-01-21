'use strict'


module.exports = (type) => {


	let message = {

		'user_exist_es': 'El email ya existe!',
		'user_complet_es': 'Complete todo los datos',
		'fail_access_es': 'Authentication failed. Invalid user or password.',
		'fail_user_es': 'Unauthorized user!' 
	
	}


	return message[type];


}