const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 255,
    },
    email: {
        type: String,
        unique: true,
        index: true,
        minlength: 4,
    },
    password: {
        type: String,
        required: true,
    },
    dateRegister: {
        type: Date,
        default: Date.now,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

userSchema.methods.generateToken = function generateToken() {
    return jwt.sign(
        {
            _id: this.id,
            isAdmin: this.isAdmin,
        },
        config.get("secretKey"),
        {
            expiresIn: "1h",
        }
    );
};

module.exports = mongoose.model("users", userSchema);
