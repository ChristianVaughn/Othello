<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
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


<body onload="loadScores();">
  <nav>
    <ul>
      <li><a href="leaderboard.php" class="active">Home</a></li>
      <li><a href="index.php">Game</a></li>
      <li><a href="howto.php">How To Play</a></li>
      <li><a href="about.php">About</a></li>
      <li style="float:right"><a href="php/logout.php">Log Out</a></li>
      <li style="float:right"><a href="php/reset-password.php">Account</a></li>
    </ul>
  </nav>
  <header class="page-header">
    <br>
    <h1 style="color:black">Hello, <b><?php echo $userN; ?></b>. Welcome Back.</h1>
  </header>
  <span class="custom-dropdown large">
    <select name="gamemode" onchange="switchCat(this.value);">
      <option value="4">4x4 Grid</option>
      <option value="6">6x6 Grid</option>
      <option value="8">8x8 Grid</option>

    </select>
  </span>
  <section>

    <table id="scoreTable" width=100%>
      <thead>
        <tr>
          <th class="tablehead">
            <p>4x4 Grid<p>
          </th>
        </tr>
      </thead>
      <tr class=" colheader">
        <th>Id</th>
        <th onclick="sortList(0);">
          <h4>Player</h4>
        </th>
        <th onclick="sortList(1);">
          <h4>Game Mode<h4>
        </th>
        <th onclick="sortList(2);">
          <h4>Game Duration<h4>
        </th>
        <th onclick="sortList(3);">
          <h4>Score<h4>
        </th>
      </tr>
    </table>
  </section>
  <div id="cardContainer"></div>

  <div class="card" id="profileCard" style='display:none'>
  <img src="profilepics/cvaughn55.png" alt="John" style="width:100%">
  <h1>Christian Vaughn</h1>
  <p class="title">Cvaughn55</p>
  <p>Age: 21</p>
  <p>Gender: Male</p>
  <p>Location: USA</p>

  <button onclick="hideProfile();">Close</button></div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<script src="js/leaderboard.js"></script>

</html>