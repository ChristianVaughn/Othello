<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <title></title>
  <link href="./css/style.css" rel="stylesheet">
  <link rel="stylesheet" href="css/howto.css">
</head>
<nav>
  <ul>
  <li><a href="leaderboard.php" >Home</a></li>
    <li><a href="index.php" >Game</a></li>
    <li><a class="active" href="howto.php" >How To Play</a></li>
    <li><a href="about.php" >About</a></li>
    <li style="float:right"><a href="php/logout.php" >Log Out</a></li>
    <li style="float:right"><a href="php/reset-password.php">Account</a></li>

  </ul>
</nav>
<body>
  <br>
  <br>
  <h2 style="color:black;">How to Play</h2>
<button type="button" class="collapsible">Reversi Game Setup</button>
<div class="content">
  <p style="color:black;" >Reversi is a strategy board game played between 2 players. One player plays black and the other white.
    Each player gets discs according to board size.</p>
  <p style="color:black;" >This game offers the option to slect different board sizes,
    and alternate between CPU diffulty levels or allowing a second Player to play against you!</p>
  <img src="./img/othello setup.gif" alt="Italian Trulli" align="middle">
</div>
<h2 style="color:black;">Rules:</h2>
<button type="button" class="collapsible">Moving Pieces</button>
<div class="content">
  <p style="color:black;" >Black always moves first.
    A move is made by placing a disc of the player's color on the board in a position that "out-flanks" one or more of the opponent's discs.
    A disc or row of discs is outflanked when it is surrounded at the ends by discs of the opposite color.
    A disc may outflank any number of discs in one or more rows in any direction (horizontal, vertical, diagonal).</p>
  <img src="./img/othello play1.gif" alt="Italian Trulli">
  <p style="color:black;" >All the discs which are outflanked will be flipped, even if it is to the player's advantage not to flip them.
    Discs may only be outflanked as a direct result of a move and must fall in the direct line of the disc being played.
    If you can't outflank and flip at least one opposing disc, you must pass your turn. However, if a move is available to you, you can't forfeit your turn.</p>
</div>

<button type="button" class="collapsible">End Game</button>
<div class="content">
  <p style="color:black;" >When it is no longer possible for either player to move, the game is over.
    The discs are now counted and the player with the majority of his or her color discs on the board is the winner.
    A tie is possible.</p>
    <img src="./img/othello end.gif" alt="Italian Trulli">
</div>

</body>
<script src="js/howto.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="js/script.js"></script>
</html>
