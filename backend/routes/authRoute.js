const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const validateRequest = require('../middlewares/validateRequest');
const registerUserSchema = require('../middlewares/validationSchema/userValidation');

authRouter.post('/register', validateRequest(registerUserSchema.registerUserValidationSchema), authController.register);

authRouter.post('/login',validateRequest(registerUserSchema.logInUserValidationSchema), authController.login);

authRouter.post('/logout', authController.logout);


module.exports = authRouter;