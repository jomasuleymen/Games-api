const jwt = require("jsonwebtoken");
const config = require("config");

const user = async (req, res, next) => {
    req.user = null;

    const token = req.headers.token;

    if (token) {
        jwt.verify(token, config.get("secretKey"), (err, user) => {
            if (!err) req.user = user;
            next();
        });
    } else next();
};

module.exports = user;
