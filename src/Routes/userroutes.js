const usercontroller = require("../controllers/usercontroller");
const express = require("express");
const multer = require("multer");
const validation_model = require("../middleware/validation_sceme");
const router = express.Router();
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        const name = `user-${Date.now()}.${ext}`;
        cb(null, name);
    },
})
const filterFile = (req, file, cb) => {
    const imagetype = file.mimetype.split("/")[0];
    if (imagetype === "image") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: diskStorage, fileFilter: filterFile }); 
router.route("/register").post(validation_model.createuservalidation(),upload.single("Avatar"),usercontroller.createuser);
router.route("/login").post(validation_model.loginvalidation(),usercontroller.loginuser);
module.exports = router;