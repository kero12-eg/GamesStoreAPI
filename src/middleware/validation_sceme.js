const { body } = require("express-validator");

const Validation_model = {
     createuservalidation : () => {
  return [
    body("Full_Name").not().isEmpty().withMessage("Full Name is required").bail()
    .isLength({ min: 3 }).withMessage(
      "Full Name must be at least 3 characters long",
    ),
    body("Email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    body("Password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ];
},
 loginvalidation : () => {
  return [
    body("Email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    body("Password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ];
},
 createproductvalidation : () => {
  return [
    body("Name").not().isEmpty().withMessage("Name is required").bail()
    .isLength({ min: 3 }).withMessage(
      "Name must be at least 3 characters long",
    ),
    body("Rating")
      .not()
      .isEmpty()
      .withMessage("Rate is required")
      .isFloat({ min: 0 })
      .withMessage("Rate must be a positive number"),
      body("Time")
      .not()
      .isEmpty()
      .withMessage("Time is required"),
      body("Description")
      .not()
      .isEmpty()
      .withMessage("Description is required"),
    
  ];
 }
}

module.exports = Validation_model;
