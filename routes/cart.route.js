var express=require('express');
var controller=require('../controllers/cart.controller');
var router=express.Router();

router.get('/add/:bookId',controller.addToCart);
router.get('/rent', controller.rent);

module.exports=router;