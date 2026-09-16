const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateAccessToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET_KEY,
        {
            expiresIn: "1m"
        }
    );
};


module.exports = {
    generateAccessToken
};