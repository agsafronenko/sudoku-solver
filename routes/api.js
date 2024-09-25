"use strict";
const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    let { puzzle, coordinate, value } = req.body;
    if (!puzzle || !coordinate || !value) return res.json({ error: "Required field(s) missing" });
    if (coordinate.length !== 2 || !/[A-I]/i.test(coordinate[0]) || !/[1-9]/.test(coordinate[1])) return res.json({ error: "Invalid coordinate" });
    if (!/^[1-9]$/.test(value)) return res.json({ error: "Invalid value" });
    let validated = solver.validate(puzzle);
    if (!Array.isArray(validated)) return res.json({ error: validated });
    let [row, col, val] = [["A", "B", "C", "D", "E", "F", "G", "H", "I"].indexOf(coordinate[0]), coordinate[1] - 1, parseInt(value)];
    let checkCoordinate = solver.checkPlacement(validated, row, col, val);
    return Array.isArray(checkCoordinate) ? res.json({ valid: false, conflict: checkCoordinate }) : res.json({ valid: true });
  });

  app.route("/api/solve").post((req, res) => {
    // console.log("req.body.puzzle ====>", req.body.puzzle)
    let validated = solver.validate(req.body.puzzle);
    return !Array.isArray(validated) ? res.json({ error: validated }) : res.json({ solution: solver.solve(validated) });
  });
};
