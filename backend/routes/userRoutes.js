const router = require('express').Router();
const userController = require('../controllers/userControllers')

// Creating user registration route
router.post('/create', userController.createUser)

// login routes
router.post('/login', userController.loginUser)

// forgot password
router.post('/forgot_password', userController.forgotPassword)

// verify otp and set password
router.post('/verify_otp', userController.verifyOtpAndSetPassword)

// controller (Export) - Routes (inport) - use - (index.js)

// exporting the router
module.exports = router