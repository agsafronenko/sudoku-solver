class SudokuSolver {
  createArrayFromString(puzzle1D) {
    let puzzle2D = [];
    for (let i = 0; i < 9; i++) {
      puzzle2D.push(puzzle1D.splice(0, 9));
    }
    return puzzle2D;
  }
  validate(puzzleString) {}
  checkRowPlacement(puzzle, row, column, value) {
    // console.log("row", row, "col", column, "val", value);
    for (let i = 0; i < 9; i++) {
      if (puzzle[row][i] === value) {
        return false;
      }
    }
    // console.log("found the num", value);
    return true;
  }

  checkColPlacement(puzzle, row, column, value) {
    for (let j = 0; j < 9; j++) {
      if (puzzle[j][column] === value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzle, row, column, value) {
    let [regionRow, regionCol] = [row - (row % 3), column - (column % 3)];
    for (let i = regionRow; i < 3; i++) {
      for (let j = regionCol; j < 3; j++) {
        if (puzzle[i][j] === value) {
          return false;
        }
      }
    }
    return true;
  }

  solve(puzzle) {
    // console.log("====>", puzzle);
    // check if puzzle is solved (are there any dots in an array?)
    let [r, c, dotFound] = [false, false, false];
    for (let i = 0; i < 9; i++) {
      if (dotFound) break;
      for (let j = 0; j < 9; j++) {
        if (puzzle[i][j] === ".") {
          [r, c] = [i, j];
          dotFound = true;
          break;
        }
      }
    }
    // if puzzle is solved:
    if (!dotFound) {
      console.log("the puzzle is solved", puzzle);
      return true;
    }
    // if puzzle is not solved:
    // create a loop from 1 to 9 to replace the first dot in the array
    for (let v = 1; v < 9; v++) {
      // if row, col, square check is true:
      // recurse the function
      if (this.checkRowPlacement(puzzle, r, c, v) && this.checkColPlacement(puzzle, r, c, v) && this.checkRegionPlacement(puzzle, r, c, v)) {
        puzzle[r][c] = v;
        if (this.solve(puzzle)) return true;
      } else {
        puzzle[r][c] = ".";
      }
      // if all nums don't pass the check backtrack to previous recursion
    }
    console.log("+++ puzzle +++", puzzle);
    return false;
  }
}

module.exports = SudokuSolver;
