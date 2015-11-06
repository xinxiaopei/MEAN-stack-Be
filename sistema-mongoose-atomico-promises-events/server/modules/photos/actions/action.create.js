'use strict';

let photo = require('../photo_model');
const formidable = require('formidable');

const Action = {
		create: function(req, res) {
		debug('Action Create');

		formParse(req, (err, result) => {
			let promise = photo.create(result);
			promise.then(succesHandler , errorHandler)

			function succesHandler (photo){
				debug('Action Create secces');
				res.status(201).json(photo);
			}

			function errorHandler (err) {
				debug('Action Create error');
				res.status(400).json(err);
			}	
		});
  }
}

function formParse(req , cb) {
	let form = new formidable.IncomingForm();
	form.uploadDir = "../server/public/image";
	form.parse(req, (err, fields, files) => {
		if(!err) { 
			return cb(null, {
					path : files.image.path
				,	legend : fields.legend
				});
		}
		return cb(err);
	});
} 
module.exports = Action;
