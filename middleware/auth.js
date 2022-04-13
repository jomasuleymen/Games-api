const jwt = require("jsonwebtoken");
const config = require("config");

const auth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) throw new Error("not valid token");

        req.user = jwt.verify(token, config.get("secretKey"));
        next();
    } catch (err) {
        res.status(400).send(err.message);
    }
};

module.exports = auth;
