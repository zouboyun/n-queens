/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (i === 0 && j === 0) {
        solution.togglePiece(i, j);
        break;
      }
      solution.togglePiece(i, j);
      if (solution.hasColConflictAt(j)) {
        solution.togglePiece(i, j);
      } else {
        break;
      }
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var factorial = function(n) {
    if (n === 0 || n === 1) {
      return 1;
    }
    return n * factorial(n - 1);
  };
  var solutionCount = factorial(n);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // debugger;
  var baseArr = [new Array(n).fill(0)];
  // debugger;
  // some recursion here
  var makeBoard = function(arr, queensLeft) {
    var rows = arr.slice();
    if (queensLeft === 0) {
      return rows;
    } else {
      for (var i = 0; i < n; i++) {
        rows[0][i] = 1;
        var newBoard = new Board(rows);
        // debugger;
        if (!newBoard.hasAnyQueensConflicts()) {
          return makeBoard(baseArr.concat(rows), queensLeft - 1);
          // return makeBoard(rows.concat(baseArr), queensLeft - 1);
        } else {
          rows[0][i] = 0;
        }
      }
    }
  };

  

  var solution = new Board(makeBoard(baseArr, n));
  // var numPieces = _.reduce(solution, function(memo, row) {
  //   return memo + _.reduce(row, function(memo, col) {
  //     return memo + col;
  //   }, 0);
  // }, 0);
  // if (!solution.get(0).length) {
  //   return [[]];
  // }
  console.log(solution.get('n'));
  console.log(solution);
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
