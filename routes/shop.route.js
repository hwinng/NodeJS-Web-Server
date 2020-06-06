var express = require('express');
var controller = require('../controllers/shop.controller');
var router = express.Router();


//books
router.get("/", controller.index);

router.get('/:id/books', controller.view);

module.exports = router;  