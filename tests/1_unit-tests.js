const chai = require("chai");
const assert = chai.assert;

const SudokuSolver = require("../controllers/sudoku-solver.js");
let solver = new SudokuSolver();

suite("Unit Tests", () => {
    let validPuzzle = ".2...6...45..891237....3456214..5897.658...14.9721436..31642..8.4297853197.5316.2";
    let validatedValidPuzzle = solver.validate(validPuzzle);
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
      assert.equal(solver.validate(validPuzzle.replace(".", "X")), "Invalid characters in puzzle");
    });
  
    test("Missing puzzle string", () => {
      assert.equal(solver.validate(), "Required field missing");
    });
  
    test("Solve valid puzzle", () => {
      let solvedPuzzle = solver.solve(solver.validate(validPuzzle)).join("")
      let actualSolution = "123456789456789123789123456214365897365897214897214365531642978642978531978531642"
      assert.equal(solvedPuzzle, actualSolution, "The solution should match the expected solution")
    });
  
    test("Solve invalid puzzle", () => {
      assert.equal(solver.validate(invalidPuzzle), "Puzzle cannot be solved");
    });
  
    test("Unsolvable puzzle", () => {
      assert.equal(solver.validate(unsolvablePuzzle), "Puzzle cannot be solved");
    });
  
    test("Check valid row/column/region placement", () => {
      let [row, column, value] = [0, 0, 1]
      assert.isTrue(solver.checkPlacement(validatedValidPuzzle, row, column, value));
    });
  
    test("Check invalid row placement", () => {
      let [row, column, value] = [0, 0, 6]
      assert.deepEqual(solver.checkPlacement(validatedValidPuzzle, row, column, value), ["row"]);
    });
  
    test("Check invalid column placement", () => {
      let [row, column, value] = [0, 0, 9]
      assert.deepEqual(solver.checkPlacement(validatedValidPuzzle, row, column, value), ["column"]);
    });
  
    test("Check invalid region placement", () => {
      let [row, column, value] = [0, 0, 5]
      assert.deepEqual(solver.checkPlacement(validatedValidPuzzle, row, column, value), ["region"]);
    });
  
    test("Check placement conflicts across row, column, and region", () => {
      let [row, column, value] = [0, 0, 2]
      assert.deepEqual(solver.checkPlacement(validatedValidPuzzle, row, column, value), ["row", "column", "region"]);
    });
  });
