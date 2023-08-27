// const chai = require("chai");
// const assert = chai.assert;

// const SudokuSolver = require("../controllers/sudoku-solver.js");
// let solver = new SudokuSolver();

// suite("Unit Tests", () => {
//   let validPuzzle = "759236.1.816495..2432178...174569...395842.6.62......9......1945....4..7.4.3..6..";
//   test("Logic handles a valid puzzle string of 81 characters", (done) => {
//     let puzzle = validPuzzle;
//     assert.isArray(solver.validate(puzzle), true);
//     assert.equal(solver.validate(puzzle).flat().length, 81);
//     done();
//   });
//   test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", (done) => {
//     let invalidCharacters = "..invalid..chars..";
//     let puzzle = invalidCharacters + validPuzzle.slice(0, -invalidCharacters.length);
//     let puzzle2D = solver.validate(puzzle);
//     assert.equal(puzzle2D, "Invalid characters in puzzle");
//     done();
//   });
//   test("Logic handles a puzzle string that is not 81 characters in length", (done) => {
//     let puzzle = validPuzzle + "......89";
//     let puzzle2D = solver.validate(puzzle);
//     assert.equal(puzzle2D, "Expected puzzle to be 81 characters long");
//     done();
//   });
//   test("Logic handles a valid row placement", (done) => {
//     let puzzle = validPuzzle;
//     let puzzle2D = solver.validate(puzzle);
//     assert.isTrue(solver.checkPlacement(puzzle2D, 8, 8, 5), true);
//     done();
//   });
//   test("Logic handles an invalid row placement", (done) => {
//     let puzzle = validPuzzle;
//     let puzzle2D = solver.validate(puzzle);
//     assert.isArray(solver.checkPlacement(puzzle2D, 8, 8, 3), true);
//     assert.deepEqual(solver.checkPlacement(puzzle2D, 8, 8, 3), ["row"]);
//     done();
//   });
//   test("Logic handles a valid column placement", (done) => {
//     let puzzle = validPuzzle;
//     let puzzle2D = solver.validate(puzzle);
//     assert.isTrue(solver.checkPlacement(puzzle2D, 8, 8, 5), true);
//     done();
//   });
//   test("Logic handles an invalid column placement", (done) => {
//     let puzzle = validPuzzle;
//     let puzzle2D = solver.validate(puzzle);
//     assert.isArray(solver.checkPlacement(puzzle2D, 8, 8, 2), true);
//     assert.deepEqual(solver.checkPlacement(puzzle2D, 8, 8, 2), ["column"]);
//     done();
//   });
//   test("Logic handles a valid region placement", (done) => {
//     let puzzle = validPuzzle;
//     let puzzle2D = solver.validate(puzzle);
//     assert.isTrue(solver.checkPlacement(puzzle2D, 8, 8, 5), true);
//     done();
//   });
//   test("Logic handles an invalid region placement", (done) => {
//     let puzzle = validPuzzle;
//     let puzzle2D = solver.validate(puzzle);
//     assert.isArray(solver.checkPlacement(puzzle2D, 8, 8, 2), true);
//     assert.deepEqual(solver.checkPlacement(puzzle2D, 8, 8, 1), ["region"]);
//     done();
//   });
//   test("Valid puzzle strings pass the solver", (done) => {
//     let puzzle = validPuzzle;
//     let puzzle2D = solver.validate(puzzle);
//     assert.equal(solver.solve(puzzle2D), "759236418816495372432178956174569283395842761628713549283657194561924837947381625");
//     done();
//   });
//   test("Invalid puzzle strings fail the solver", (done) => {
//     let puzzle = validPuzzle.slice(0, -2) + "66";
//     assert.equal(solver.validate(puzzle), "Puzzle cannot be solved");
//     done();
//   });
//   test("Solver returns the expected solution for an incomplete puzzle", (done) => {
//     let puzzle = ".".repeat(81);
//     let puzzle2D = solver.validate(puzzle);
//     assert.equal(solver.solve(puzzle2D), "123456789456789123789123456214365897365897214897214365531642978642978531978531642");
//     done();
//   });
// });
