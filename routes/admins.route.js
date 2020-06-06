var express = require('express');
var multer= require('multer');
var controller = require('../controllers/admins.controller');
var middleAuth = require("../middlewares/requireAuth");
var router = express.Router();
var upload = multer({ dest: './public/uploads/'})


//books
router.get("/", controller.index);

router.get('/sell-book', controller.getSellBook);
router.post('/sell-book', upload.single('coverUrl'), controller.postSellBook);

module.exports = router;  