const chai = require("chai");
const assert = chai.assert;

const SudokuSolver = require("../controllers/sudoku-solver.js");
let solver = new SudokuSolver();

suite("Unit Tests", () => {
    let validPuzzle = ".23......4567891237...23456214..58973658...14897214365531642..864297853197.5316.2";
    let invalidPuzzle = "123456789123456789123456789123456789123456789123456789123456789123456789123456789";
    let unsolvablePuzzle = "123456789123456789123456789123456789123456789123456789123456789123456789123456780";
  
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
      let validated = solver.validate(invalidPuzzle);
      assert.equal(validated, "Puzzle cannot be solved");
    });
  
    // Test 8: Unsolvable puzzle (should return false)
    test("Unsolvable puzzle", () => {
      let validated = solver.validate(unsolvablePuzzle);
      let result = solver.solve(validated);
      assert.equal(result, "Puzzle cannot be solved");
    });
  
    // Test 9: Check row placement validity
    test("Check valid row placement", () => {
      let puzzle = solver.create2DArray(validPuzzle);
      assert.isTrue(solver.checkPlacement(puzzle, 0, 0, 5));
    });
  
    // Test 10: Check invalid row placement (should return conflict)
    test("Check invalid row placement", () => {
      let puzzle = solver.create2DArray(validPuzzle);
      let conflict = solver.checkPlacement(puzzle, 0, 1, 4);
      assert.deepEqual(conflict, ["row"]);
    });
  
    // Test 11: Check valid column placement
    test("Check valid column placement", () => {
      let puzzle = solver.create2DArray(validPuzzle);
      assert.isTrue(solver.checkPlacement(puzzle, 0, 0, 6));
    });
  
    // Test 12: Check invalid column placement (should return conflict)
    test("Check invalid column placement", () => {
      let puzzle = solver.create2DArray(validPuzzle);
      let conflict = solver.checkPlacement(puzzle, 1, 0, 4);
      assert.deepEqual(conflict, ["column"]);
    });
  
    // Test 13: Check valid square placement
    test("Check valid square placement", () => {
      let puzzle = solver.create2DArray(validPuzzle);
      assert.isTrue(solver.checkPlacement(puzzle, 0, 0, 9));
    });
  
    // Test 14: Check invalid square placement (should return conflict)
    test("Check invalid square placement", () => {
      let puzzle = solver.create2DArray(validPuzzle);
      let conflict = solver.checkPlacement(puzzle, 1, 1, 3);
      assert.deepEqual(conflict, ["region"]);
    });
  
    // Test 15: Check placement in multiple rows, columns, and regions (should return all conflicts)
    test("Check placement conflicts across row, column, and region", () => {
      let puzzle = solver.create2DArray(validPuzzle);
      puzzle[0][0] = 7; // Create conflict in row, column, and region
      let conflicts = solver.checkPlacement(puzzle, 0, 0, 7);
      assert.deepEqual(conflicts, ["row", "column", "region"]);
    });
  });
