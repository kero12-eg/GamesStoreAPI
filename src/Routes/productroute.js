const express = require("express");
const productcontroller = require("../controllers/productcontroller");
const validation_model = require("../middleware/validation_sceme");
const verifytoken = require("../middleware/verifytoken");
const router = express.Router();
router
  .route("/")
  .get(verifytoken, productcontroller.getproduct)
  .post(
    verifytoken,
    validation_model.createproductvalidation(),
    productcontroller.createproduct,
  );
module.exports = router;
