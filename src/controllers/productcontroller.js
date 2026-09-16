const productmodel = require("../models/productmodel");
const { validationResult } = require("express-validator");
const asyncwarapper = require("../middleware/ascyncwarapper");
const apperror = require("../utils/apperror");
const httpstatustext = require("../utils/httpstatustext");

const createproduct = asyncwarapper(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = apperror.create(
            errors.array(),
            400,
            httpstatustext.FAIL
        );

        return next(error);
    }

    const { Name, Image_Url, Rating, Time, Description } = req.body;

    const user_id = req.user.ID;

    const result = await productmodel.createproduct({
        Name,
        Image_Url,
        Rating,
        Time,
        Description,
        user_id,
    });

    return res.status(200).json({
        status: "success",
        message: "product created successfully",
        data: {
            id: result,
        },
    });
});

const getproduct = asyncwarapper(async (req, res, next) => {
    const user_id = req.user.ID;
    const result = await productmodel.getproduct(user_id);
    return res.status(200).json({
        status: "success",
        message: "products fetched successfully",
        data: {
            result,
        },
    });
});
module.exports = { createproduct, getproduct };