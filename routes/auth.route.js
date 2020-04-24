var express = require('express');
var controller = require('../controllers/auth.controller')
var userVadilation = require('../validation/user.validation')
var router = express.Router();

router.get('/login', controller.login);
router.post('/login', controller.postLogin);

module.exports = router;