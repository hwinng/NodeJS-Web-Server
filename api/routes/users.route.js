var express = require('express');
var controller = require('../controllers/user.controller');
var router = express.Router();

//users
router.get("/", controller.index);