const config = require("config");
module.exports = function () {
    if (!config.has("secretKey"))
        throw new Error("FATAL ERROR: secretKey is not defined.");
    if (!config.has("db")) throw new Error("FATAL ERROR: db is not defined.");
};
