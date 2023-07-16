const Joi = require('joi');

const registerUserValidationSchema = Joi.object({
    username : Joi.string().required(),
    password : Joi.string().required()
})

const logInUserValidationSchema = Joi.object({
    username : Joi.string().required(),
    password : Joi.string().required()
})

module.exports = {
    registerUserValidationSchema,
    logInUserValidationSchema
}