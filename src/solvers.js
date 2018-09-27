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
  var solution = new Board({n: n});
  var findSol = function(board, row) {
    if (row === n) {
      return board;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        var result = findSol(board, row + 1);
        if (result) {
          return result;
        }
      }
      board.togglePiece(row, i);    
    }
  };

  findSol(solution, 0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  var findSol = function(board, row) {
    if (row === n) {
      return function() {
        solutionCount++;
      }();
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        var result = findSol(board, row + 1);
        if (result) {
          return result;
        }
      }
      board.togglePiece(row, i);    
    }
  };

  findSol(board, 0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
