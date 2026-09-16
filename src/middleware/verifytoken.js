const jwt = require("jsonwebtoken");

const apperror = require("../utils/apperror");
const httpstatustext = require("../utils/httpstatustext");

const verifytoken = (req, res, next) => {

    const authHeader =
        req.headers["Authorization"] ||
        req.headers["authorization"];

    if (!authHeader) {
        const error = apperror.create(
            "Token is required",
            401,
            httpstatustext.ERROR
        );

        return next(error);
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        const error = apperror.create(
            "Invalid authorization format",
            401,
            httpstatustext.ERROR
        );

        return next(error);
    }

    const token = parts[1];

    try {

        const user = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET_KEY
        );

        req.user = user;

        next();

    } catch (err) {

        const error = apperror.create(
            "Invalid or expired token",
            401,
            httpstatustext.ERROR
        );

        return next(error);
    }
};

module.exports = verifytoken;