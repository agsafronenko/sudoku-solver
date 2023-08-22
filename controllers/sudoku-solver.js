class SudokuSolver {
  constructor() {
    this.size = 9;
  }
  create2DArray(puzzleString) {
    let puzzle1D = puzzleString.split("").map((x) => (x === "." ? 0 : parseInt(x)));
    let puzzle2D = [];
    for (let i = 0; i < this.size; i++) {
      puzzle2D.push(puzzle1D.splice(0, 9));
    }
    return puzzle2D;
  }
  validate(puzzleString) {}
  checkRowPlacement(puzzle, row, val) {
    for (let i = 0; i < this.size; i++) {
      if (puzzle[row][i] === val) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzle, col, val) {
    for (let j = 0; j < this.size; j++) {
      if (puzzle[j][col] === val) {
        return false;
      }
    }
    return true;
  }

  checkSqrPlacement(puzzle, row, col, val) {
    let [sqrSize, sqr1stRow, sqr1stCol] = [Math.sqrt(this.size), row - (row % sqrSize), col - (col % sqrSize)];
    for (let i = sqr1stRow; i < sqrSize; i++) {
      for (let j = sqr1stCol; j < sqrSize; j++) {
        if (puzzle[i][j] === val) {
          return false;
        }
      }
    }
    return true;
  }

  solve(puzzle) {
    // check if the puzzle is solved (are there any zeros in the 2D array?):
    let [row, col, zeros] = [false, false, false];
    for (let i = 0; i < this.size; i++) {
      if (zeros) break;
      for (let j = 0; j < this.size; j++) {
        if (puzzle[i][j] === 0) {
          [row, col] = [i, j];
          zeros = true;
          break;
        }
      }
    }
    // return "true" if the puzzle is solved:
    if (!zeros) return true;
    // else:
    // brute-force values (from 1 to "this.size") to replace the first occurance of zero in the 2D array:
    for (let val = 1; val <= this.size; val++) {
      // if row, column and square puzzle validity checks are "true" for the new value, recurse the function until all zeros are replaced with new values
      if (this.checkRowPlacement(puzzle, row, val) && this.checkColPlacement(puzzle, col, val) && this.checkSqrPlacement(puzzle, row, col, val)) {
        puzzle[row][col] = val;
        if (this.solve(puzzle)) return true;
      } else {
        // if puzzle validity checks fail, try next value (up to "this.size")
        puzzle[row][col] = 0;
      }
    }
    // if all values fail the puzzle validiy check, return "false" to backtrack to previous recursive iteration (do this until the puzzle is solved or return "false")
    return false;
  }
}

module.exports = SudokuSolver;
