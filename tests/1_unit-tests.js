const chai = require("chai");
const assert = chai.assert;

const SudokuSolver = require("../controllers/sudoku-solver.js");
let solver = new SudokuSolver();

suite("Unit Tests", () => {
    let validPuzzle = ".23......4567891237...23456214..58973658...14897214365531642..864297853197.5316.2";
    let invalidPuzzle = "123456789123456789123456789123456789123456789123456789123456789123456789123456789";
    let unsolvablePuzzle = "111456789123456789123456789123456789123456789123456789123456789123456789123456788";
  
    test("Valid puzzle string of 81 characters", () => {
      assert.isArray(solver.validate(validPuzzle), true);
      assert.equal(solver.validate(validPuzzle).flat().length, 81);
    });
  
    test("Puzzle string with > 81 characters", () => {
      assert.equal(solver.validate(validPuzzle + "1"), "Expected puzzle to be 81 characters long");
    });
  
    test("Puzzle string with < 81 characters", () => {
      assert.equal(solver.validate(validPuzzle.slice(0, 80)), "Expected puzzle to be 81 characters long");
    });
  
    test("Puzzle string with invalid characters", () => {
      let invalidCharPuzzle = validPuzzle.replace(".", "X");
      assert.equal(solver.validate(invalidCharPuzzle), "Invalid characters in puzzle");
    });
  
    test("Missing puzzle string", () => {
      assert.equal(solver.validate(), "Required field missing");
    });
  
    test("Solve valid puzzle", () => {
      let solvedPuzzle = solver.solve(solver.validate(validPuzzle));
      let actualSolution = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 4, 5, 6,
        7, 8, 9, 1, 2, 3, 7, 8, 9, 1, 2, 3,
        4, 5, 6, 2, 1, 4, 3, 6, 5, 8, 9, 7,
        3, 6, 5, 8, 9, 7, 2, 1, 4, 8, 9, 7,
        2, 1, 4, 3, 6, 5, 5, 3, 1, 6, 4, 2,
        9, 7, 8, 6, 4, 2, 9, 7, 8, 5, 3, 1,
        9, 7, 8, 5, 3, 1, 6, 4, 2
      ]
      assert.deepEqual(solvedPuzzle, actualSolution, "The solution should match the expected solution")
    });
  
    test("Solve invalid puzzle", () => {
      let validatedPuzzle = solver.validate(invalidPuzzle);
      assert.equal(validatedPuzzle, "Puzzle cannot be solved");
    });
  
    test("Unsolvable puzzle", () => {
      let validatedPuzzle = solver.validate(unsolvablePuzzle);
      assert.equal(validatedPuzzle, "Puzzle cannot be solved");
    });
  
    test("Check valid row placement", () => {
      let validatedPuzzle = solver.validate(validPuzzle);
      let [row, column, value] = ["A", 1, 1]
      // console.logsle", validatedPuzzle)
      assert.isTrue(solver.checkPlacement(validatedPuzzle, row, column, value));
    });
  
    test("Check invalid row placement", () => {
      let puzzle = solver.create2DArray(validPuzzle);
      let conflict = solver.checkPlacement(puzzle, 0, 1, 4);
      assert.deepEqual(conflict, ["row"]);
    });
  
    test("Check valid column placement", () => {
      let puzzle = solver.create2DArray(validPuzzle);
      assert.isTrue(solver.checkPlacement(puzzle, 0, 0, 6));
    });
  
    test("Check invalid column placement", () => {
      let puzzle = solver.create2DArray(validPuzzle);
      let conflict = solver.checkPlacement(puzzle, 1, 0, 4);
      assert.deepEqual(conflict, ["column"]);
    });
  
    test("Check valid square placement", () => {
      let puzzle = solver.create2DArray(validPuzzle);
      assert.isTrue(solver.checkPlacement(puzzle, 0, 0, 9));
    });
  
    test("Check invalid square placement", () => {
      let puzzle = solver.create2DArray(validPuzzle);
      let conflict = solver.checkPlacement(puzzle, 1, 1, 3);
      assert.deepEqual(conflict, ["region"]);
    });
  
    test("Check placement conflicts across row, column, and region", () => {
      let puzzle = solver.create2DArray(validPuzzle);
      puzzle[0][0] = 7; // Create conflict in row, column, and region
      let conflicts = solver.checkPlacement(puzzle, 0, 0, 7);
      assert.deepEqual(conflicts, ["row", "column", "region"]);
    });
  });
