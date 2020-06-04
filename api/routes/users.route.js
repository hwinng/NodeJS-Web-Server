var express = require('express');
var controller = require('../controllers/users.controller');
var router = express.Router();

//users
router.get("/", controller.index);

module.exports = router; 