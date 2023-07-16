const Joi = require('joi');

const validateUserRequest = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body, {abortEarly : false});

  if (validationResult.error) {
    const errors = validationResult.error.details.map((error) => error.message.replace(/\"/g, ''));
    return res.status(400).json({ 
       status : 400,
       success : false,
       message : 'validation error!',
       errorDetails : errors
    });
  }

  // Validation succeeded
  next();
};

module.exports = validateUserRequest;






