const usercontroller = require("../controllers/usercontroller");
const express = require("express");
const validation_model = require("../middleware/validation_sceme");
const router = express.Router();
router.route("/register").post(validation_model.createuservalidation(),usercontroller.createuser);
router.route("/login").post(validation_model.loginvalidation(),usercontroller.loginuser);
module.exports = router;