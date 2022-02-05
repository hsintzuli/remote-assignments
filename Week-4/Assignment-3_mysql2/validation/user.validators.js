const Joi = require('joi')

const userSchema = Joi.object({
    email: Joi.string().email().trim(true).required(),
    password: Joi.string().trim(true).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

module.exports = userSchema;