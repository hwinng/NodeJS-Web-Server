var express = require('express');
var multer = require('multer');

var controller = require('../controllers/books.controller');
var middleAuth = require("../middlewares/requireAuth");

var router = express.Router();
var upload = multer({ dest: './public/uploads/'})


//books
router.get("/", controller.index);

//books actions
router.get('/action', middleAuth.requireAuth, controller.action);

// books searching
router.get("/search", controller.search);

//books creating
router.get("/create", controller.create);

router.post("/create",
	upload.single('coverUrl'),
	controller.postCreate);

//books deleting

router.get("/:id/delete", controller.delete);

//books updating
router.get("/:id/update", controller.update);

router.post("/:id/update", controller.postUpdate);

module.exports = router;  