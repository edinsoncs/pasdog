'use strict'


module.exports = (type) => {


	let message = {

		'user_exist_es': 'El email ya existe!',
		'user_complet_es': 'Complete todo los datos',
		'fail_access_es': 'Authentication failed. Invalid user or password.',
		'fail_user_es': 'Unauthorized user!',
		'fail_dog_complet_es': 'Complete todo los datos',
		'success_dog_es': 'Se dio de alta una nueva mascota',
		'user_role_es': 'No llego el tipo de usuario role',
		'user_pricepaseador_es': 'Se cargo detalles del paseador',
		'user_pricepaseador_error_es': 'Falta enviar los campos precio y detalle',
		'fail_list_dog': 'No tienes ningun dog'
	
	}


	return message[type];


}