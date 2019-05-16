const passport = require('passport');
const express = require('express');
const router = express.Router();

//config for authcheck
const { isLoggedIn, logggedInAlready } = require('../config/authcheck');
//Controller file
const userController = require('../controllers/user_controller');


//register route
router.get('/register', logggedInAlready, userController.register);
//register callback route route
router.post('/register', logggedInAlready, userController.registerProcess);
//login route
router.get('/login', logggedInAlready, userController.login);
//login callback route route
router.post('/login', logggedInAlready, userController.loginProcess);
//logout route
router.get('/logout', isLoggedIn, userController.logout);
//user profile
//router.get('/profile/:id', isLoggedIn, userController.profile);
//user dashboard
router.get('/dashboard', isLoggedIn, userController.dashboard);

//export router
module.exports = router;
