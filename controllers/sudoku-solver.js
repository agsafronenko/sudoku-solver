class SudokuSolver {
  validate(puzzleString) {}

  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {
    // create and two-dimentional array (9x9 size)
    // check if puzzle is solved (are there any dots in an array?)
    // if puzzle is solved:
    // return true
    // if puzzle is not solved:
    // find the first dot in the array
    // create a loop from 1 to 9 to replace the dot
    // if row, col, square check is true:
    // recurse the function
    // if row, col, square check is false:
    // try next num in the loop
    // if all nums don't pass the check backtrack to previous recursion
  }
}

module.exports = SudokuSolver;
