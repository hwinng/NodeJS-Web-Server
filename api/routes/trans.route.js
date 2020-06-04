var express = require('express');
var controller = require('../controllers/trans.controller');
var router = express.Router();


router.get("/", controller.index);

// //create new transaction
// router.get("/create", controller.create);

// router.post("/create", controller.postCreate);

// router.get("/:id/complete", controller.complete);

// router.post("/:id/complete", controller.postState);

module.exports = router;  