var express = require('express');
var shortid = require('shortid');
var controller = require('../controllers/books.controller');

var db = require('../db');
var router = express.Router();

// books
router.get("/", controller.index);

// books searching
router.get("/search", controller.search);

//books creating
router.get("/create", controller.create);

router.post("/create", controller.postCreate);

//books deleting

router.get("/:id/delete", controller.delete);

//books updating
router.get("/:id/update", controller.update);

router.post("/:id/update", controller.postUpdate);

module.exports = router;  