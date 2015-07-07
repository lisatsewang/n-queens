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
  
  var board = new Board({n: n});
  var chessCount = 0;
  var boardN = board.attributes.n;

  var placePieces = function() {
    for(var i = 0; i < boardN; i++) {
      for(var j = 0; j < boardN; j++) {
        board.togglePiece(i, j);
        chessCount++;
        
        if(chessCount > 1 && board.hasAnyRooksConflicts()) {
          board.togglePiece(i, j);
          chessCount--;
        }
        if(chessCount === boardN) {
          return;
        }
      }
    }
  };
  placePieces();

  var solution = [];

  _.each(board.attributes, function(item) {
    if(Array.isArray(item)) {
      solution.push(item);
    }
  });

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var chessCount = 0;
  var rowCount = 0;
  var board = new Board({n: n});

  var placePiece = function(currBoard, rowIndex, colIndex) {
    //increment row index
    currBoard.togglePiece(rowIndex, colIndex);
    chessCount++;

    //check for conflicts
    //if conflict toggle back and decrease chesscount

    //if chesscount === n && no conflicts, solutionCount++
    //chessCount = 0

    //increment solution count when found


  };
  for(var i = 0; i < n; i++) {
    for(var j = 0; j < n; j++) {
      placePiece(board, j, i); 
    }
  }

  var isDuplicate = function(matrix1, matrix2) {
    for (var i = 0; i < matrix1.length; i++) {
      for (var j = 0; j < matrix1.length; j--) {
        if (matrix1[i][j] !== matrix2[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
