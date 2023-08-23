"use strict";
const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {});

  app.route("/api/solve").post((req, res) => {
    let puzzle2D = solver.create2DArray(req.body.puzzle);
    let validation = solver.validate(req.body.puzzle, puzzle2D);
    if (validation !== true) {
      console.log("validation ====>", validation);
      res.json(validation);
    } else {
      let result = solver.solve(puzzle2D);
      console.log("result ======>", result);
    }
  });
};
