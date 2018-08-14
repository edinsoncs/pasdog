'use strict';

module.exports.ctr = (name, req, res, next) => {

	switch(name) {
		case 'register':

				require('./registerController')(req, res, next);
			
			break;

		case  'login':

				require('./loginController')(req, res, next);	

			break;

		case  'profile':

				require('./profileController')(req, res, next);

			break;

		case  'getprofile':


				require('./profileController').getprofile(req, res, next);

			break;

		case  'role':

				require('./roleController')(req, res, next);

			break;

		case  'dog_new':

				require('./dog/newdogController')(req, res, next);

			break;
		
		default:
			break;
	}



}