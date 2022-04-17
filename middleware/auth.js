const jwt = require("jsonwebtoken");
const config = require("config");

const auth = async (req, res, next) => {
    try {
        const bearer = req.headers.authorization;
        if (!bearer) throw new Error("Token not provided.");

        const tokenInfo = bearer.split(" ");
        if (!tokenInfo || tokenInfo.length !== 2)
            throw new Error("Authorization token pattern: Bearer token");

        const token = tokenInfo[1];
        req.user = jwt.verify(token, config.get("secretKey"));
        next();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = auth;
