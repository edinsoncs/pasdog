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
		'fail_list_dog': 'No tienes ningun dog',
		'success_dog_es_update': 'Se actualizo la mascota',
		'fail_dog_es_update': 'Enviame el id del dog',
		'fail_dog_es_update_photo': 'Enviame el id del dog para cambiar la foto',
		'success_dog_photo_profile': 'Se actualizo la foto',
		'fail_list_dog_not': 'No tienes ninguna mascota',
		'fail_remove_dog_not': 'Ocurrio un error, la mascota no se elimina',
		'success_dog_es_remove': 'Se elimino la mascota',
		'not_find_id': 'No se encontro el usuario',
		'not_insert_contract': 'No se inserto un nuevo contrato'
	
	}


	return message[type];


}