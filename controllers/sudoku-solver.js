class SudokuSolver {
  constructor() {
    this.size = 9;
    this.sqrSize = Math.sqrt(this.size);
  }

  create2DArray(puzzleString) {
    let puzzle1D = puzzleString.split("").map((x) => (x === "." ? 0 : parseInt(x)));
    let puzzle2D = [];
    for (let i = 0; i < this.size; i++) {
      puzzle2D.push(puzzle1D.splice(0, 9));
    }
    return puzzle2D;
  }

  checkPlacement(puzzle, row, col, val) {
    // check row placement:
    for (let i = 0; i < this.size; i++) {
      if (col !== i && puzzle[row][i] === val) {
        return false;
      }
    }
    // check column placement:
    for (let j = 0; j < this.size; j++) {
      if (row !== j && puzzle[j][col] === val) {
        return false;
      }
    }
    // check square placement:
    let [sqr1stRow, sqr1stCol] = [row - (row % this.sqrSize), col - (col % this.sqrSize)];
    for (let i = sqr1stRow; i < sqr1stRow + this.sqrSize; i++) {
      for (let j = sqr1stCol; j < sqr1stCol + this.sqrSize; j++) {
        if (row !== i && col !== j && puzzle[i][j] === val) {
          return false;
        }
      }
    }
    return true;
  }

  validate(puzzleString, puzzle2D) {
    // check the size of the initial input
    if (puzzleString.length !== this.size ** 2) return "Expected puzzle to be 'this.size ** 2' characters long";
    // check for invalid characters in the initial input
    if (!/^[1-9.]+$/.test(puzzleString)) return "Invalid characters in puzzle";
    // check whether the initial input doesn't break row, column and square placement rules:
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (puzzle2D[i][j] !== 0) {
          let [row, col, val] = [i, j, puzzle2D[i][j]];
          if (!this.checkPlacement(puzzle2D, row, col, val)) {
            return "Puzzle cannot be solved";
          }
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
      // if the new value passes the row, column and square placement checks, recurse the solve(puzzle) function until all zeros are replaced with new values
      if (this.checkPlacement(puzzle, row, col, val)) {
        puzzle[row][col] = val;
        if (this.solve(puzzle)) {
          return puzzle.flat().join("");
        } else {
          puzzle[row][col] = 0;
        }
      }
    }
    // if all values fail the row, column and square placement checks, return "false" to backtrack to previous recursive iteration (or, in case the puzzle can not be solved, after backtracking to the first function call, "false" will be returned as a result)
    return false;
  }
}

module.exports = SudokuSolver;
