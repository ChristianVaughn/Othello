var gameBoard = []; // A variable to hold a matrix representation of the game board.
var boardSize = 8; // board size default to 8, and changes when renderLevel is called.
var cpuEnabled = true;
var cpuColor = 2; //CPU default to player2.
var whosTurn = 1;
var p1Score = 2;
var p2Score = 2;
var p1Color = "#000000"
var p2Color = "#FFFFFF"



function renderLevel(tableSize) {
    boardSize = tableSize;
    var myTable = document.createElement('table');
    myTable.setAttribute('id', 'main-table');

    var gameWrap = document.getElementById('game-board');
    while (gameWrap.firstChild) {
        gameWrap.removeChild(gameWrap.firstChild);
    }
    gameWrap.appendChild(myTable);

    for (let i = 0; i < tableSize; i++) {


        let row = document.createElement('tr');
        myTable.appendChild(row);

        for (let j = 0; j < tableSize; j++) {

            let cell = document.createElement('td');

            cell.innerHTML = '<span class="disc"></span>';
            // j = x, i = y
            cell.setAttribute('class', 'cell empty ');
            cell.setAttribute('id', String(j) + String(i));
            cell.setAttribute('onclick', 'playMove(' + (j) + ',' + (i) + ',this.id)');
            cell.setAttribute('data-x', j + 1);
            cell.setAttribute('data-y', i + 1);
            cell.setAttribute('data-clicked', 'false');
            if ((j === tableSize / 2 - 1 && i === tableSize / 2 - 1) || (j === tableSize / 2 && i === tableSize / 2)) {
                cell.setAttribute('class', 'cell white ');
            }
            if ((j === tableSize / 2 - 1 && i === tableSize / 2) || (j === tableSize / 2 && i === tableSize / 2 - 1)) {
                cell.setAttribute('class', 'cell black ');
            }

            row.appendChild(cell);
        }
    }
}

function cpuRandomMove() {
    var temparr = [];
    for (let i = 0; i < boardSize; i++) {

        for (let j = 0; j < boardSize; j++) {
            if (gameBoard[j][i] === 3) {
                temparr.push([j, i]);
            }
        }
    }
    var rand = temparr[Math.floor(Math.random() * temparr.length)];
    playMove(rand[0], rand[1], "" + rand[0] + rand[1]);

}

function boardColorChange(color) {
    $("#game-board > table .cell").css("background", color.value);

}
function p1ColorChange(color) {
    p1Color = color;
    $("#game-board > table .cell.black > .disc").css("background", p1Color);

}
function p2ColorChange(color) {
    p2Color = color;
    $("#game-board > table .cell.white > .disc").css("background", p2Color);
}
function setGameMode(mode) { 
    cpuEnabled = mode;//Switch whos turn it is.
}
//A function that takes the empty gameBoard matrix defined in global and initializes it with starting board value based on passed in size.
function initBoardArray(tableSize) {
    for (let i = 0; i < tableSize; i++) {
        gameBoard[i] = [];
    }
    for (let i = 0; i < tableSize; i++) {
        for (let j = 0; j < tableSize; j++) {
            if ((j === tableSize / 2 - 1 && i === tableSize / 2 - 1) || (j === tableSize / 2 && i === tableSize / 2)) {
                gameBoard[j][i] = 2;
            }
            else if ((j === tableSize / 2 - 1 && i === tableSize / 2) || (j === tableSize / 2 && i === tableSize / 2 - 1)) {
                gameBoard[j][i] = 1;
            }
            else {
                gameBoard[j][i] = 0;
            }

        }
    }
    console.log(gameBoard);

}

//Second and last helper function for finding all Possible moves for a player
function findMovesHelper2(currPlayer, oppPlayer, x, y, dirX, dirY) {
    //console.log(x);
    //Check if next position is outside the board
    if ((x + dirX < 0) || (x + dirX >= boardSize) || (y + dirY < 0) || (y + dirY >= boardSize)) {
        return false;
    }
    /*Check if next position contains opposing player disk
    if so call current function again with next position as the X and Y*/
    if (gameBoard[x + dirX][y + dirY] === oppPlayer) {
        return findMovesHelper2(currPlayer, oppPlayer, x + dirX, y + dirY, dirX, dirY);
    }

    /*Check if next position contains current player disk
    if so return true*/
    if (gameBoard[x + dirX][y + dirY] === currPlayer) {
        return true;
    }
    //false should be returned at this line if the next space is empty.
    return false;
}

/*Helper function for findMoves that checks if the next space is in bounds.
 if so one more helper function is called to finish checking. */
function findMovesHelper(currentPlayer, x, y, dirX, dirY) {
    var oppositePlayer = (currentPlayer === 1 ? 2 : 1);//Player not making a move

    //checking if next position over is out of the board.
    if ((x + dirX < 0) || (x + dirX > boardSize - 1) || (y + dirY < 0) || (y + dirY > boardSize - 1)) {
        return false;
    }
    if (gameBoard[x + dirX][y + dirY] != oppositePlayer) {
        return false;
    }
    //second helper function to gets called if next position is in bounds, and position contains opposing players piece.
    if (findMovesHelper2(currentPlayer, oppositePlayer, x + dirX, y + dirY, dirX, dirY)) {
        return true;
    }

}
//Move through the whole board to find all possible moves for a player.
function findMoves(currentPlayer) {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {

            /*if the game board is empty,
            check all 8 directions to see if
            there are any possible moves */
            if (gameBoard[j][i] === 0) {
                var up = findMovesHelper(currentPlayer, j, i, 0, -1);
                var down = findMovesHelper(currentPlayer, j, i, 0, 1);
                var left = findMovesHelper(currentPlayer, j, i, -1, 0);
                var right = findMovesHelper(currentPlayer, j, i, 1, 0);
                var uLeft = findMovesHelper(currentPlayer, j, i, -1, -1);
                var uRight = findMovesHelper(currentPlayer, j, i, 1, -1);
                var dLeft = findMovesHelper(currentPlayer, j, i, -1, 1);
                var dRight = findMovesHelper(currentPlayer, j, i, 1, 1);

                //If a possible move was found set the current possition on the gameBoard matrix to 3.
                if (up || down || left || right || uLeft || uRight || dLeft || dRight) {
                    gameBoard[j][i] = 3;
                    var possCell = document.getElementById(String(j) + String(i));
                    possCell.setAttribute('class', 'cell playable ');
                    if (whosTurn == 1) {
                        $("#game-board > table .cell.playable > .disc").css("background", p1Color);
                    }
                    else {
                        $("#game-board > table .cell.playable > .disc").css("background", p2Color);
                    }

                }

            }
        }

    }
    var canplay = false; //check if possible move
    for (let i = 0; i < boardSize; i++) {
        if (gameBoard[i].includes(3)) {
            canplay = true; // if a 3 is found there is at least one possible move return true.
            return true;
        }
    }
    return false;
    //console.log(gameBoard);
}

function clearPossibleMoves() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (gameBoard[j][i] === 3) {
                var possCell = document.getElementById(String(j) + String(i));
                possCell.setAttribute('class', 'cell empty ');
                gameBoard[j][i] = 0;

            }
        }
    }
}

/*Helper function for playMove that flips all the discs that make
valid moves. */
function flipLines(currentPlayer, x, y, dirX, dirY) {
    var oppositePlayer = (currentPlayer == 1 ? 2 : 1);//Player not making a move

    //checking if next position over is out of the board.
    if ((x + dirX < 0) || (x + dirX > boardSize - 1) || (y + dirY < 0) || (y + dirY > boardSize - 1)) {
        return false;
    }
    if (gameBoard[x + dirX][y + dirY] === 0) {
        return false;
    }
    if (gameBoard[x + dirX][y + dirY] === currentPlayer) {
        return true;
    }
    if (gameBoard[x + dirX][y + dirY] === oppositePlayer) {
        if (flipLines(currentPlayer, x + dirX, y + dirY, dirX, dirY)) {
            var setColor = (currentPlayer == 1 ? 'black' : 'white');
            var currCell = document.getElementById(String(x + dirX) + String(y + dirY));
            currCell.setAttribute('class', 'cell ' + setColor);
            gameBoard[x + dirX][y + dirY] = whosTurn;
            return true;
        }

    }
    return false;
}
function updateScore() {
    /*
    TODO: ADD ELEMENTS TO UPDATE GAME UI
    */
    p1Score = 0;
    p2Score = 0;
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (gameBoard[j][i] === 1) {
                p1Score++;
            }
            else if (gameBoard[j][i] === 2) {
                p2Score++;
            }

        }
    }
    console.log("Player 1 Score: " + p1Score);
    console.log("Player 2 Score: " + p2Score);

}
function playMove(x, y, cellID) {
    //checking if clicked cell is a possible move.
    if (gameBoard[x][y] === 3) {
        var up = flipLines(whosTurn, x, y, 0, -1);
        var down = flipLines(whosTurn, x, y, 0, 1);
        var left = flipLines(whosTurn, x, y, -1, 0);
        var right = flipLines(whosTurn, x, y, 1, 0);
        var uLeft = flipLines(whosTurn, x, y, -1, -1);
        var uRight = flipLines(whosTurn, x, y, 1, -1);
        var dLeft = flipLines(whosTurn, x, y, -1, 1);
        var dRight = flipLines(whosTurn, x, y, 1, 1);

        //If a possible move was found set the current possition on the gameBoard matrix to 3.
        if (up || down || left || right || uLeft || uRight || dLeft || dRight) {
            gameBoard[x][y] = whosTurn; // set clicked cell to players color after switching all other cells
            var clickedCell = document.getElementById(cellID);
            var setColor = (whosTurn == 1 ? 'black' : 'white');
            clickedCell.removeAttribute('class', 'cell playable ');
            clickedCell.setAttribute('class', 'cell ' + setColor);
            p1ColorChange(p1Color);
            p2ColorChange(p2Color);
            console.log(gameBoard);
            whosTurn = (whosTurn == 1 ? 2 : 1);//Switch whos turn it is.
            clearPossibleMoves();
            console.log(gameBoard);
            updateScore();
            if (!findMoves(whosTurn)) {
                whosTurn = (whosTurn == 1 ? 2 : 1);//Switch whos turn it is
                if (!findMoves(whosTurn)) {
                    console.log("gameover");
                    alert("Game Over.\nPlease finish programming my end game function.")
                    /*
                    TODO: Add code here to handle ending the game 
                    */
                }
            }
            //(whosTurn == 1 ? $("#game-board > table .cell.playable > .disc").css("background", p1Color) :$("#game-board > table .cell.playable > .disc").css("background", p2Color))

            if (whosTurn === cpuColor && cpuEnabled) {
                setTimeout(cpuRandomMove, 500);//wait a few seconds before cpu moves
            }
        }

    }

}

function gameStart() {
     //$('#game-options').toggleClass('open');
    
    var options = document  .getElementById("game-options");
    options.style.display = "none";
    whosTurn = 1;
    initBoardArray(boardSize);
    findMoves(whosTurn);


}
