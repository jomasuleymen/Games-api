const jwt = require("jsonwebtoken");
const config = require("config");

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) throw new Error("Token not provided.");

        req.user = jwt.verify(token, config.get("secretKey"));
        next();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = auth;
