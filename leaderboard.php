<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
$userN = $_SESSION["username"];
?>
<!DOCTYPE html>
<html>
<head>
  <title>Table with database</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <link href="./css/style.css" rel="stylesheet">
    <link rel="stylesheet" href="./css/scoreboard.css">

</head>
<nav>
  <ul>
    <li><a href="leaderboard.php" class="active">Home</a></li>
    <li><a href="index.php" >Game</a></li>
    <li><a href="howto.php" >How To Play</a></li>
    <li><a href="#about" >About</a></li>
    <li style="float:right"><a href="php/logout.php" >Log Out</a></li>
    <li style="float:right"><a href="php/reset-password.php">Account</a></li>
  </ul>
</nav>
<header class="page-header">
  <br>
  <h1 style="color:black" >Hello, <b><?php echo $userN; ?></b>. Welcome Back.</h1>
</header>

<body onload="loadScores();">
<button style="color:black;" onclick="switchCat(4);">4x4</button>
<button style="color:black;" onclick="switchCat(6);">6x6</button>
<button style="color:black;" onclick="switchCat(8);">8x8</button>
  <section>
  <table id="scoreTable" width=100%>
    <tr>
      <th>Id</th>
      <th onclick="sortList(0);">Player</th>
      <th onclick="sortList(1);">Game Mode</th>
      <th onclick="sortList(2);">Game Duration</th>
      <th onclick="sortList(3);">Score</th>
    </tr>
  </section>



  </table>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<script src="js/leaderboard.js"></script>

</html>
