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

//var b = new Board({n:3})

window.findNRooksSolution = function(n, board) {
  var newBoard;

  if(board !== undefined) {
    newBoard = new Board(board.rows());
    n = board.attributes.n;
  } else {
    newBoard = new Board({n: n});
  }
  var chessCount = 0;

  if(newBoard.hasAnyRooksConflicts()) {
    console.log('cannot use board with conflicts');
  }

  //count pieces on passed in board
  _.each(newBoard, function(row) {
    if(Array.isArray(row)) {
      _.each(row, function(space) {
        chessCount += space;
      });
    }
  });

  var placePiece = function() {
    for(var i = 0; i < n; i++) {
      for(var j = 0; j < n; j++) {
        // debugger;
        if(newBoard.attributes[i][j] === 0) {
          newBoard.togglePiece(i, j);
          //check board..
          if(newBoard.hasAnyRooksConflicts()) {
            newBoard.togglePiece(i, j);
          } else if(!newBoard.hasAnyRooksConflicts()) {
            chessCount++;
            if(chessCount === n) {
              return;
            }
            //if board not full, place another piece recursively
            placePiece();
          } 
        }
      }
    }
  };
  placePiece();

  var solution = newBoard.rows();

  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// [[0,1,0],[0,0,1],[0,0,0]]


var getNextRowIndex = function(board) {
  var n = board.attributes.n;
  var boardAttr = board.attributes;

  for(var i = n - 1; i > -1; i--) {
    if(_.contains(boardAttr[i], 1)) {
      return i + 1;
    }
  }
  return 0;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var chessCount = 0;
  var solutionCache = {};
  var currSolCode;

  //for saftey
  if(n > 4) {
    return;
  }

  var board = new Board({n: n});

  var makeSolutionCode = function(board) {
    return _.flatten(board.rows()).join('');
  };

  var isDupeSolution = function(solutionCode) {
    return solutionCache[solutionCode] === undefined ? false : true;
  }  

  var placePiece = function(board) {
    if(chessCount === n) {
      // if(board.attributes.n > 1) debugger;
      currSolCode = makeSolutionCode(board);
      if(!isDupeSolution(currSolCode)) {
        solutionCache[currSolCode] = currSolCode;
        solutionCount++;
      }
      // console.log(board.rows().join('\n,'));

      return;
    } else {

      for(var i = 0; i < n; i++) {
        for(var j = 0; j < n; j++) {
          
          //copy board
          var currBoard = new Board(board.rows());
          var boardAttr = currBoard.attributes;

          //if space can take a piece, place piece
          if(boardAttr[i][j] === 0) {
            currBoard.togglePiece(i, j);
            
            //check board..
            if(currBoard.hasAnyRooksConflicts()) {
              currBoard.togglePiece(i, j);
            } else {
              
              //if placed piece causes no conflicts
              //increment chessCount, and place another piece recursively
              chessCount++;
              // minCounter++;
              placePiece(currBoard);

              //try other options here
              currBoard.togglePiece(i, j);
              chessCount--;  
            }
          }
          
        }
      }
    }
  };
  placePiece(board);

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
