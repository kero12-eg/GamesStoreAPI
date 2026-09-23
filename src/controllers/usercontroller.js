const usermodel = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const asyncwarapper = require("../middleware/ascyncwarapper");
const apperror = require("../utils/apperror");
const httpstatustext = require("../utils/httpstatustext");
const { generateAccessToken, generateRefreshToken} = require("../utils/generatejwt");
const createuser = asyncwarapper(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = apperror.create(
            errors.array(),
            400,
            httpstatustext.FAIL
        );
        return next(error);
    }

    const { Full_Name, Email, Password } = req.body;

    // 1. Check Full Name first
    const FullNameExists = await usermodel.FullNameexists(Full_Name);

    if (FullNameExists) {
        const error = apperror.create(
            "Full Name already exists",
            409,
            httpstatustext.FAIL
        );
        return next(error);
    }

    // 2. Check Email second
    const emailExists = await usermodel.Emailisexists(Email);

    if (emailExists) {
        const error = apperror.create(
            "Email already exists",
            409,
            httpstatustext.FAIL
        );
        return next(error);
    }

    // 3. Create user
    const hashedPassword = await bcrypt.hash(Password, 10);

    const USERID = await usermodel.createuser({
        Full_Name,
        Email,
        Password: hashedPassword,
        Avatar: req.file.filename,
    });

    const accesstoken = await generateAccessToken({
        ID: USERID,
        Email: Email,
    });

    return res.status(200).json({
        status: "success",
        message: "User created successfully",
        data: {
            accesstoken,
        },
    });
});
const loginuser = asyncwarapper( async (req, res,next) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = apperror.create(errors.array(),400,httpstatustext.FAIL);
        return next(error);
    }
    const {Email,Password} = req.body;
    const user = await usermodel.getUserByEmail(Email);
    if (!user) {
        const error = apperror.create("Invalid email or password",401,httpstatustext.FAIL);
        return next(error);
    }
    const isPasswordMatch = await bcrypt.compare(Password, user.Password);
    if (!isPasswordMatch) {
        const error = apperror.create("Password is incorrect",401,httpstatustext.FAIL);
        return next(error);
    }
       const accesstoken = await generateAccessToken({ID : user.ID ,Email: user.Email,});
    return res.status(200).json({
        status: "success",
        message: "logged in successfully",
        data: {
            accesstoken
        }
    });
})
module.exports = { createuser,loginuser };