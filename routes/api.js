"use strict";
const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    let validated = solver.validate(req.body.puzzle);
    if (!Array.isArray(validated)) return res.json({ error: validated });
    let [row, col, val] = [["A", "B", "C", "D", "E", "F", "H", "G", "I"].indexOf(req.body.coordinate[0]), req.body.coordinate[1] - 1, parseInt(req.body.value)];
    let checkCoordinate = solver.checkPlacement(validated, row, col, val);
    console.log("====>", checkCoordinate);
    return Array.isArray(checkCoordinate) ? res.json({ valid: false, conflict: checkCoordinate }) : res.json({ valid: true });
  });

  //   You can POST to /api/check an object containing puzzle, coordinate, and value where the coordinate is the letter A-I indicating the row, followed by a number 1-9 indicating the column, and value is a number from 1-9.
  // Failed:The return value from the POST to /api/check will be an object containing a valid property, which is true if the number may be placed at the provided coordinate and false if the number may not. If false, the returned object will also contain a conflict property which is an array containing the strings "row", "column", and/or "region" depending on which makes the placement invalid.
  // Failed:If value submitted to /api/check is already placed in puzzle on that coordinate, the returned value will be an object containing a valid property with true if value is not conflicting.
  // Failed:If the puzzle submitted to /api/check contains values which are not numbers or periods, the returned value will be { error: 'Invalid characters in puzzle' }
  // Failed:If the puzzle submitted to /api/check is greater or less than 81 characters, the returned value will be { error: 'Expected puzzle to be 81 characters long' }
  // Failed:If the object submitted to /api/check is missing puzzle, coordinate or value, the returned value will be { error: 'Required field(s) missing' }
  // Failed:If the coordinate submitted to api/check does not point to an existing grid cell, the returned value will be { error: 'Invalid coordinate'}
  // Failed:If the value submitted to /api/check is not a number between 1 and 9, the returned value will be { error: 'Invalid value' }

  app.route("/api/solve").post((req, res) => {
    let validated = solver.validate(req.body.puzzle);
    return !Array.isArray(validated) ? res.json({ error: validated }) : res.json({ solution: solver.solve(validated) });
  });
};
