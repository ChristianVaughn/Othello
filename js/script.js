var gameBoard = []; // A variable to hold a matrix representation of the game board.
var boardSize = 8; // board size default to 8, and changes when renderLevel is called.
var cpuMode = 1; // 0 no cpu, 1 Random move, 2 move that flips most discs
var cpuColor = 2; //CPU default to player2.
var whosTurn = 1;
var p1Score = 2;
var p2Score = 2;
var p1Color = "#000000"
var p2Color = "#FFFFFF"
var timerInterval = null;
var globalTimer = 0;


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
function countLines(x, y, dirX, dirY) {
    var oppositePlayer = (whosTurn == 1 ? 2 : 1);//Player not making a move

    //checking if next position over is out of the board.
    if ((x + dirX < 0) || (x + dirX > boardSize - 1) || (y + dirY < 0) || (y + dirY > boardSize - 1)) {
        return [0, false];
    }
    if (gameBoard[x + dirX][y + dirY] === 0) {
        return [0, false];
    }
    if (gameBoard[x + dirX][y + dirY] === whosTurn) {
        return [0, true];
    }
    if (gameBoard[x + dirX][y + dirY] === oppositePlayer) {
        var recur = countLines(x + dirX, y + dirY, dirX, dirY);
        if (recur[1]) {
            return [recur[0] + 1, true];
        }
    }
    return [0, false]; //Without this one of the countLines function calls returns undefined for every single 
}

function countMaxFlips(x, y) {
    //checking if clicked cell is a possible move.
    if (gameBoard[x][y] === 3) {
        var up = countLines(x, y, 0, -1);
        var down = countLines(x, y, 0, 1);
        var left = countLines(x, y, -1, 0);
        var right = countLines(x, y, 1, 0);
        var uLeft = countLines(x, y, -1, -1);
        var uRight = countLines(x, y, 1, -1);
        var dLeft = countLines(x, y, -1, 1);
        var dRight = countLines(x, y, 1, 1);



        var retVal = up[0] + down[0] + left[0] + right[0] + uLeft[0] + uRight[0] + dLeft[0] + dRight[0];
        return retVal;

    }

}

function cpuRandomMove() {
    var possMoves = [];
    for (let i = 0; i < boardSize; i++) {

        for (let j = 0; j < boardSize; j++) {
            if (gameBoard[j][i] === 3) {
                possMoves.push([j, i]);
            }
        }
    }
    if (cpuMode === 1) {
        var rand = possMoves[Math.floor(Math.random() * possMoves.length)];
        playMove(rand[0], rand[1], "" + rand[0] + rand[1]);
    }
    else if (cpuMode === 2) {
        var maxMovesArr = [];
        for (let i = 0; i < possMoves.length; i++) {
            maxMovesArr.push(countMaxFlips(possMoves[i][0], possMoves[i][1]));
        }
        var maxMove = 0;
        var maxMovePos = 0;
        for (let i = 0; i < maxMovesArr.length; i++) {
            if (maxMovesArr[i] > maxMove) {
                maxMove = maxMovesArr[i];
                maxMovePos = i;
            }
        }
        playMove(possMoves[maxMovePos][0], possMoves[maxMovePos][1], "" + possMoves[maxMovePos][0] + possMoves[maxMovePos][1]);
        console.log(maxMovesArr);

    }


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
    cpuMode = parseInt(mode);//Switch whos turn it is.
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
                $("#game-board > table .cell.playable > .disc").css("background", "");
                $(possCell).removeClass('cell playable ');

                $(possCell).addClass('cell empty ');

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
    document.getElementById("p1Score").innerText = p1Score;
    document.getElementById("p2Score").innerText = p2Score;
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
                    whosTurn = -1;
                    console.log("gameover");
                    /*
                    TODO: Add code here to handle ending the game 
                    */
                    gameOver();

                }
            }

            if (whosTurn === cpuColor && cpuMode != 0) {
                setTimeout(cpuRandomMove, 500);//wait a few seconds before cpu moves
            }
        }

    }

}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);
        globalTimer = timer;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (++timer < 0) {
            timer = duration;
        }
    }, 1000);
}

function gameOver() {
    stopTimer();
    var $usernamee = $("#p1Name").text();
    $.get("php/getPFP.php", { username: $usernamee })
        .done(function (data) {
            var pfp = JSON.parse(data);
            var pfpPath = "profilepics/" + pfp[0]['pfp'];
            fillDetailedMatchStatistics(pfpPath, 'profilepics/CPU.png');
            showDetailedMatchStatistics();
            /*
                ! Order: Username Gamemode Gridsize gametime score pfp. 
                score.php   
                */
            var $usernamee = $("#p1Name").text();
            var gamemode = "";
            if (cpuMode === 0) {
                gamemode = "2p Game";
            }
            else if (cpuMode === 1) {
                gamemode = "Easy CPU";
            }
            else {
                gamemode = "Hard CPU";
            }
            var dataToSend = { username: $usernamee, gamemode: gamemode, boardsize: boardSize, globaltimer: globalTimer, p1score: p1Score, profilepic: pfpPath };
            $.post("php/score.php", dataToSend/*,function(data, status){
    alert("Data: " + data + "\nStatus: " + status);
  }*/);
        });



}
function stopTimer() {
    clearInterval(timerInterval);
}

function gameStart() {
    //$('#game-options').toggleClass('open');

    //var options = document.getElementById("game-options");
    var $options = $('#game-options');
    var $scoreoard = $('.scoreboard');
    $options.animate({ 'left': -500 }, 500, function () {
        //$detailsCurtain.animate({'opacity': 0}, 300, function() {
        $(this).css('display', 'none');
        // }); 
    });
    $scoreoard.animate({ 'top': '100%' }, 500, function () {
        //$detailsCurtain.animate({'opacity': 0}, 300, function() {
        // }); 
    });
    //options.style.display = "none";
    whosTurn = 1;
    initBoardArray(boardSize);
    findMoves(whosTurn);

    var display = document.querySelector('#time');
    startTimer(0, display);


}




var $detailsContainer = $('#match-details-container');
var $detailsCurtain = $('#match-details-curtain');


$('#close-details').on('click', function (e) {
    e.preventDefault();
    closeDetailedMatchStatistics();
});

var fillDetailedMatchStatistics = function (p1Pic, p2Pic) {
    var Gamemode;
    $('.play1.logo').css('background-image', 'url("' + p1Pic + '")');

    $('.play1.name').text($("#p1Name").text());

    $('.play1.score').text($("#p1Score").text());

    $('.play2.logo').css('background-image', 'url("' + p2Pic + '")');

    $('.play2.name').text($("#p2Name").text());

    $('.play2.score').text($("#p2Score").text());
    if (cpuMode === 0) {
        Gamemode = "2P Game";
    }
    else if (cpuMode === 1) {
        Gamemode = "Easy CPU";
    }
    else if (cpuMode === 2) {
        Gamemode = "Hard CPU";
    }
    $('#matchMode').text(Gamemode);
    $('#matchTime').text($("#time").text());

    var $play2ScoreEl = $('.play2.score');
    var $play1ScoreEl = $('.play1.score');
    var $play2Score = +$play2ScoreEl.text();
    var $play1Score = +$play1ScoreEl.text();

    if ($play2Score == $play1Score) {
        $($play2ScoreEl, $play1ScoreEl).addClass('winner');
    } else if ($play2Score > $play1Score) {
        $play2ScoreEl.addClass('winner');
        $play1ScoreEl.removeClass('winner');
    } else {
        $play2ScoreEl.removeClass('winner');
        $play1ScoreEl.addClass('winner');
    }
};

var showDetailedMatchStatistics = function () {
    $detailsCurtain.css('display', 'flex').animate({ 'opacity': 1 }, 300, function () {
        $detailsContainer.animate({ 'opacity': 1 }, 700);
    });
}

var closeDetailedMatchStatistics = function () {
    location.reload();

    $detailsContainer.animate({ 'opacity': 0 }, 500, function () {
        $detailsCurtain.animate({ 'opacity': 0 }, 300, function () {
            $(this).css('display', 'none');


        });
    });
}

