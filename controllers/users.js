const userServices = require("../services/users");

const register = async (req, res) => {
    try {
        await userServices.registerUser(req.body);
        res.json({ message: "User was created" });
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
};

const login = async (req, res) => {
    try {
        const user = await userServices.getUser(req.body);
        const token = user.generateToken();

        res.header("x-auth-token", token) // save to localstorage
            .header("access-control-expose-headers", "x-auth-token")
            .json({
                user: {
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin,
                },
            });
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
};

const auth = async (req, res) => {
    try {
        const user = await userServices.getUserById(req.user._id);
        const token = user.generateToken();

        res.header("x-auth-token", token) // save to localstorage
            .header("access-control-expose-headers", "x-auth-token")
            .json({
                user: {
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin,
                },
            });
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
};

module.exports = { register, login, auth };
