const express = require('express');
const router = express.Router();

//config for authcheck
const { isLoggedIn, logggedInAlready } = require('../config/authcheck'); 
//Controller file
const principleController = require('../controllers/principle_controller');

//Add Principle
router.get('/add', isLoggedIn, principleController.add);
router.post('/add', isLoggedIn, principleController.addProcess);
//update Principle
router.get('/update/:id', isLoggedIn, principleController.update);
router.post('/update/:id', isLoggedIn, principleController.updateProcess);
//delete Principle
router.get('/delete/:id', isLoggedIn, principleController.delete);

//export router
module.exports = router;
