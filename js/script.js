var gameBoard = []; // A variable to hold a matrix representation of the game board. 
var boardSize = 8; // board size default to 8, and changes when renderLevel is called.

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
            //if ((i !== 0) && (j !== 0)) {
                //cell.innerHTML = (j-1)+','+(i-1);
                //cell.innerHTML='<p class="hidden-values">123<p>';

                cell.innerHTML = '<span class="disc"></span>';
                // j = x, i = y
                cell.setAttribute('class', 'cell empty ');
                cell.setAttribute('id', String(j) + String(i));
                cell.setAttribute('onclick', 'clickCell(' + (j + 1) + ',' + (i + 1) + ')');
                cell.setAttribute('data-x', j + 1);
                cell.setAttribute('data-y', i + 1);
                cell.setAttribute('data-clicked', 'false');
                if ((j === tableSize/2 -1 && i === tableSize/2-1) || (j === tableSize/2  && i === tableSize/2)) {
                    cell.setAttribute('class', 'cell white ');
                }
                if ((j === tableSize/2 -1 && i === tableSize/2) || (j === tableSize/2  && i === tableSize/2-1)) {
                    cell.setAttribute('class', 'cell black ');
                }
            /*} else {
                if (i === 0 && j === 0) {
                    cell.innerHTML = '';
                    //cell.setAttribute('id', 'top-left-cell');
                } else {

                    if (i === 0) {
                        let markCountString = markCountCols[j - 1].toString();
                        markCountString = markCountString.split(/[ ,]+/).join('<br>')
                        cell.innerHTML = markCountString;
                        //cell.innerHTML=123;
                        cell.setAttribute("class", "outside-cell outside-cell-top");
                    } else {

                        let markCountString = markCountRows[i - 1].toString();
                        markCountString = markCountString.split(/[ ,]+/).join(' ')
                        cell.innerHTML = markCountString;
                        //cell.innerHTML=123;
                        cell.setAttribute("class", "outside-cell outside-cell-left");
                    }
                }
            }*/
            row.appendChild(cell);
        }
    }
} 


function ChangeBoardColor() {
    var boardColor = $('[name="board-color"]').val();
    var p1Color = $('[name="P1-color"]').val();
    var p2Color = $('[name="P2-color"]').val();
    $("#game-board > table .cell").css("background", boardColor);
    $("#game-board > table .cell.white > .disc").css("background", p1Color);
    $("#game-board > table .cell.black > .disc").css("background", p2Color);



}
//A function that takes the empty gameBoard matrix defined in global and initializes it with starting board value based on passed in size.
function initBoardArray(tableSize) {
    for(let i = 0; i < tableSize; i++){
        gameBoard[i] = [];
    }
    for(let i = 0; i < tableSize; i++){
        for(let j = 0; j < tableSize; j++) {
            if ((j === tableSize/2 -1 && i === tableSize/2-1) || (j === tableSize/2  && i === tableSize/2)) {
                gameBoard[i][j] = 2;
            }
            else if ((j === tableSize/2 -1 && i === tableSize/2) || (j === tableSize/2  && i === tableSize/2-1)) {
                gameBoard[i][j] = 1;
            }
            else {
                gameBoard[i][j] = 0;
            }

        }
    }
    console.log(gameBoard);
    
}

//Second and last helper function for finding all Possible moves for a player
function findMovesHelper2(currPlayer,oppPlayer,x,y,dirX,dirY) {
    console.log(x);
    //Check if next position is outside the board
    if((x+dirX < 0)||(x+dirX > boardSize)||(y+dirY < 0)||(y+dirY > boardSize)){
        return false;
    }
    /*Check if next position contains opposing player disk
    if so call current function again with next position as the X and Y*/
    if(gameBoard[x+dirX][y+dirY] === oppPlayer) {
        return findMovesHelper2(currPlayer,oppPlayer,x+dirX,y+dirY,dirX,dirY);
    }

    /*Check if next position contains current player disk
    if so return true*/
    if(gameBoard[x+dirX][y+dirY] === currPlayer) {
        return true;
    }
    //false should be returned at this line if the next space is empty.
    return false;
}

/*Helper function for findMoves that checks if the next space is in bounds.
 if so one more helper function is called to finish checking. */
function findMovesHelper(currentPlayer,x,y,dirX,dirY) {
    var oppositePlayer = (currentPlayer == 1 ? 2 : 1);//Player not making a move
    
    //checking if next position over is out of the board. 
    if((x+dirX < 0)||(x+dirX > boardSize-1)||(y+dirY < 0)||(y+dirY > boardSize-1)){
        return false;
    }
    if(gameBoard[x+dirX][y+dirY] != oppositePlayer) {
        return false;
    }
    //second helper function to gets called if next position is in bounds, and position contains opposing players piece.
    if(findMovesHelper2(currentPlayer,oppositePlayer,x+dirX,y+dirY,dirX,dirY)) {
        return true;
    }

}
//Move through the whole board to find all possible moves for a player. 
function findMoves(currentPlayer) {
    for(let i = 0; i < boardSize; i++){
        for(let j = 0; j < boardSize; j++) {    

            /*if the game board is empty, 
            check all 8 directions to see if 
            there are any possible moves */
            if (gameBoard[i][j] === 0) {
               var up = findMovesHelper(currentPlayer,i,j,0,-1);
               var down = findMovesHelper(currentPlayer,i,j,0,1);
               var left = findMovesHelper(currentPlayer,i,j,-1,0);
               var right = findMovesHelper(currentPlayer,i,j,1,0);
               var uLeft = findMovesHelper(currentPlayer,i,j,-1,-1);
               var uRight = findMovesHelper(currentPlayer,i,j,1,-1);
               var dLeft = findMovesHelper(currentPlayer,i,j,-1,1);
               var dRight = findMovesHelper(currentPlayer,i,j,1,1);

               //If a possible move was found set the current possition on the gameBoard matrix to 3.
               if (up || down || left || right || uLeft || uRight || dLeft || dRight) {
                   gameBoard[i][j] = 3;
                   var possCell = document.getElementById(String(i)+String(j));
                   possCell.setAttribute('class', 'cell playable ');

                   console.log("Stupid boy think that I need him.");
                   //TODO: Add code here to add an indicator on the game board of where possible move is.
                   
               }

            }
        }
            
    }
    console.log(gameBoard);
}

function gameStart() {
    var whosTurn = 1;
    initBoardArray(boardSize);
    findMoves(whosTurn);


}
