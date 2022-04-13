const usersRouter = require("../routes/users");
const sudokuRouter = require("../routes/sudoku");

const path = require("path");

module.exports = (app) => {
    app.use("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../", "public/index.html"));
    });
    app.use("/users", usersRouter);
    app.use("/sudoku", sudokuRouter);
};
