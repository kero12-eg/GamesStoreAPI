const apperror = require("../utils/apperror");

module.exports = (role) => {
    return (req, res, next) => {

        if (!req.user) {
            return next(
                apperror.create(
                    "User is not authenticated",
                    401
                )
            );
        }

        if (req.user.role !== role) {
            return next(
                apperror.create(
                    "Unauthorized to access this route",
                    403
                )
            );
        }

        next();
    };
};