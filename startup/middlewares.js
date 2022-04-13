const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(helmet());
    app.use(cors());
    app.use(cookieParser());
    app.use((req, res, next) => {
        console.log("request");
        next();
    });
};
