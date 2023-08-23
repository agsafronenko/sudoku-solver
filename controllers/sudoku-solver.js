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
    let sqrSize = Math.sqrt(this.size);
    let [sqrRow, sqrCol] = [row % sqrSize, col % sqrSize];
    let [sqr1stRow, sqr1stCol] = [row - sqrRow, col - sqrCol];
    for (let i = sqr1stRow; i < sqrSize; i++) {
      for (let j = sqr1stCol; j < sqrSize; j++) {
        if (row !== i && col !== j && puzzle[i][j] === val) {
          return false;
        }
      }
    }
    return true;
  }
  // checkRowPlacement(puzzle, row, col, val) {
  //   for (let i = 0; i < this.size; i++) {
  //     if (col !== i && puzzle[row][i] === val) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  // checkColPlacement(puzzle, row, col, val) {
  //   for (let j = 0; j < this.size; j++) {
  //     if (row !== j && puzzle[j][col] === val) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  // checkSqrPlacement(puzzle, row, col, val) {
  //   let sqrSize = Math.sqrt(this.size);
  //   let [sqrRow, sqrCol] = [row % sqrSize, col % sqrSize];
  //   let [sqr1stRow, sqr1stCol] = [row - sqrRow, col - sqrCol];
  //   for (let i = sqr1stRow; i < sqrSize; i++) {
  //     for (let j = sqr1stCol; j < sqrSize; j++) {
  //       if (sqrRow !== i && sqrCol !== j && puzzle[i][j] === val) {
  //         return false;
  //       }
  //     }
  //   }
  //   return true;
  // }

  validate(puzzleString, puzzle2D) {
    if (puzzleString.length !== this.size ** 2) return "Expected puzzle to be 81 characters long";
    if (!/^[1-9.]+$/.test(puzzleString)) return "Invalid characters in puzzle";
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
      // if row, column and square puzzle validity checks are "true" for the new value, recurse until all zeros are replaced with new values
      if (this.checkPlacement(puzzle, row, col, val)) {
        puzzle[row][col] = val;
        if (this.solve(puzzle)) return puzzle.flat().join("");
      } else {
        // if puzzle validity checks fail, try next value (up to "this.size")
        puzzle[row][col] = 0;
      }
    }
    // if all values fail the puzzle validiy check, return "false" to backtrack to previous recursive iteration (do this until the puzzle is solved otherwise return "Puzzle cannot be solved")
    return false;
  }
}

module.exports = SudokuSolver;
