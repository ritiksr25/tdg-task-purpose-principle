const express = require('express');
const router = express.Router();

//Controller file
const indexController = require('../controllers/index_controller');

//Index route
router.get('/', indexController.index);
//aboutus route
router.get('/about', indexController.about);

//export router
module.exports = router;
