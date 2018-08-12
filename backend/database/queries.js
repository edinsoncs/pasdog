'use strict';

/**
 * [description]
 * @param  {[type]} req             [description]
 * @param  {[type]} name_collection [description]
 * @return {[collection]}                 [description]
 */
module.exports.query = (req, name_collection) => {
	const database = req.db;
	let collection = database.get(name_collection);
	return collection;
} 



