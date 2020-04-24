var express = require('express');

var controller = require('../controllers/user.controller')
var userVadilation = require('../validation/user.validation')
var authRequirement = require('../middlewares/authRequirement')

var router = express.Router();


router.get('/', authRequirement.authReq, controller.index);

router.get('/search',controller.search);

router.get('/create',controller.create);

//routing paramas
router.get('/:id',controller.getID);
//short id: to generate randomly id 

router.post('/create',controller.postCreate);

module.exports = router;