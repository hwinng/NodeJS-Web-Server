var express=require('express');
var controller=require('../controllers/login.controller');
var router=express.Router();

router.get('/',controller.login);

router.post('/',controller.postLoginV2);
module.exports=router;