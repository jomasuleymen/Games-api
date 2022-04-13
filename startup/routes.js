const usersRouter = require('../routes/users');
const sudokuRouter = require('../routes/sudoku');

module.exports = (app) => {
    app.use("/users", usersRouter);
    app.use("/sudoku", sudokuRouter);
};