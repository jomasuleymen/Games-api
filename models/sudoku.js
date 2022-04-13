const mongoose = require("mongoose");

const sudokuSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    Easy: {
        min: {
            type: Number,
            default: 0,
        },
        average: {
            type: Number,
            default: 0,
        },
        allTime: {
            type: Number,
            default: 0,
        },
        played: {
            type: Number,
            default: 0,
        },
    },
    Medium: {
        min: {
            type: Number,
            default: 0,
        },
        average: {
            type: Number,
            default: 0,
        },
        allTime: {
            type: Number,
            default: 0,
        },
        played: {
            type: Number,
            default: 0,
        },
    },
    Hard: {
        min: {
            type: Number,
            default: 0,
        },
        average: {
            type: Number,
            default: 0,
        },
        allTime: {
            type: Number,
            default: 0,
        },
        played: {
            type: Number,
            default: 0,
        },
    },
});

module.exports = mongoose.model("sudoku", sudokuSchema);
