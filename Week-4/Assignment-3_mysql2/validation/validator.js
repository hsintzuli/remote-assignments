const Joi = require('joi');
const Validators = require('./user.validators');

const userValidation = async (req, res, next) => {
	try {
		const value = await Validators.validateAsync(req.body);
		res.locals.validate = true;
		next();

	} catch(err) {
		if (err.isJoi) {
			console.log(err);
			res.locals.validate = false;
			res.locals.validationMessage = err.details[0].message;
			next();
		} else {
			next(err);
		}
	}
};

module.exports = userValidation;