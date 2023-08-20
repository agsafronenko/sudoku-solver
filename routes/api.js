"use strict";
const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {});

  app.route("/api/solve").post((req, res) => {
    let puzzle2D = solver.createArrayFromString(req.body.puzzle.split("").map((x) => (x === "." ? "." : parseInt(x))));
    let result = solver.solve(puzzle2D);
    console.log("result ======>", result);
  });
};
