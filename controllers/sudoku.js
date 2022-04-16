const Sudoku = require("../models/sudoku");
const axios = require("axios");

const generateBoard = (req, res) => {
    try {
        const difficulty = req.query.difficulty;
        axios
            .get(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
            .then(({ data }) => {
                const { board } = data;
                res.json(board);
            })
            .catch(() => {
                res.status(400).json({ error: "Some error occured" });
            });
    } catch (err) {
        res.status(400).json({ error: "Some error occured" });
    }
};

const updateRecord = async (req, res) => {
    try {
        const { spentTime, difficulty } = req.body;
        let userRecord = await Sudoku.findOne({ user: req.user._id });
        if (!userRecord) {
            userRecord = await Sudoku.create({
                user: req.user._id,
            });
        }

        userRecord[difficulty].min =
            Math.min(userRecord[difficulty].min, spentTime) || spentTime;

        const levelRecord = userRecord[difficulty];
        levelRecord.played += 1;
        levelRecord.allTime += spentTime;
        levelRecord.average = levelRecord.allTime / levelRecord.played;
        await userRecord.save();

        res.json({
            min: levelRecord.min,
            played: levelRecord.played,
            average: levelRecord.average,
        });
    } catch (err) {
        res.status(400).json({ error: "Some error occured" });
    }
};

const retriveRecord = async (req, res) => {
    try {
        let userRecord = await Sudoku.findOne({ user: req.user._id });
        if (!userRecord) {
            userRecord = await Sudoku.create({
                user: req.user._id,
            });
        }

        res.json({
            Easy: userRecord.Easy,
            Medium: userRecord.Medium,
            Hard: userRecord.Hard,
        });
    } catch (err) {
        res.status(400).json({ error: "Some error occured" });
    }
};

module.exports = {
    generateBoard,
    updateRecord,
    retriveRecord,
};
