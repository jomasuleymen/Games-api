const mongoose = require("mongoose");

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

module.exports = mongoose.model("users", userSchema);
