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

				require('./profileController').getprimary(req, res, next);

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

		case 'contract_new':

				require('./contractController').newcontract(req, res, next);

			break;

		case 'listcontract':

				require('./contractController').listcontract(req, res, next);

			break;

		case 'opencontract':


				require('./contractController').opencontract(req, res, next);

			break;


		case 'updateprofile':


				require('./profileController').updateprofile(req, res, next);

			break;


		case 'savechat':


				require('./chat/chatController').newmessage(req, res, next);

			break;


		case 'listchat':

				require('./chat/chatController').listmessage(req, res, next);

			break;

		case 'message':

				require('./messageController').newmessage(req, res, next);

			break;

		case 'listmessage':

				require('./messageController').listmessage(req, res, next);

			break;

		default:
			break;
	}



}