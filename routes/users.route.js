var express = require('express');
var multer = require('multer');

var controller = require('../controllers/user.controller');
var validate = require('../validation/user.validation')
var db = require('../db');
var router = express.Router();

var upload = multer({ dest: './publics/uploads/'})
//users
router.get("/", controller.index);

//user searching
router.get("/search", controller.search);

//user creating
router.get("/create", controller.create);

router.post("/create",
            upload.single('avatar'),
            validate.checkUserInput,
            controller.postCreate);

//user deleting
router.get("/delete/:id", controller.delete);

//user editing
router.get("/edit/:id", controller.editing);

router.post("/edit/:id", controller.postEditing);

module.exports = router;  