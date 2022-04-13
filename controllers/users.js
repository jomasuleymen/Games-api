const userServices = require("../services/users");
const jwt = require("jsonwebtoken");
const config = require("config");
const { isError } = require("joi");

const register = async (req, res) => {
    try {
        await userServices.registerUser(req.body);
        res.json({ message: "Created" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const login = async (req, res) => {
    try {
        const user = await userServices.getUser(req.body);
        const token = jwt.sign(
            {
                _id: user.id,
                isAdmin: user.isAdmin,
            },
            config.get("secretKey"),
            {
                expiresIn: "10min",
            }
        );

        res.header("x-auth-token", token) // save to localstorage
            .header("access-control-expose-headers", "x-auth-token")
            .json({
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
            });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const me = async (req, res) => {
    try {
        const token = req.headers.token;
        if (!token) throw new Error("token not valid");

        const { _id } = jwt.verify(token, config.get("secretKey"));

        const user = await userServices.getUserById(_id);
        if (!user) res.json({ user: user || null });
        res.json({
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { register, login, me };
