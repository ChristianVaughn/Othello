<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
$userN = $_SESSION["username"];
$userP = "profilepics/$userN.png";
echo $userP;
if( $_POST["BoardSize"] || $_POST["category"] || $_POST["order"] ){
  echo "Sort by ". $_POST['BoardSize']. "<br />";
  echo "Using ". $_POST['category']. " in " . $_POST["order"]. " order.";
}
$bSize = ($_POST['BoardSize']);
$category = ($_POST['category']);
$order = ($_POST['order']);
?>
<!DOCTYPE html>
<html>
<head>
  <title>Table with database</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
  <style>
  body{ font: 14px sans-serif; text-align: center; }
    section {
      margin-top: 45px;
    }
    table {
      border-collapse: collapse;
      border: 1px solid black;
      color: #588c7e;
      font-family: monospace;
      font-size: 25px;
      text-align: left;
    }
    th {
      background-color: #588c7e;
      color: white;
      border: 1px solid black;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
      border: 1px solid black;
    }
    img{
        margin-top: 45px;
        margin-left: 10px;
    }
  </style>
    <link href="./css/style.css" rel="stylesheet">
</head>
<nav>
  <ul>
    <li><a href="pPage.php" style="color:black;">Home</a></li>
    <li><a href="index.php" style="color:black;">Game</a></li>
    <li><a href="howto.php" style="color:black;">How To Play</a></li>
    <li><a href="#about" style="color:black;">About</a></li>
    <li style="float:right"><a href="php/logout.php" style="color:black;">Log Out</a></li>
    <li style="float:right"><a href="php/reset-password.php" style="color:black;">Account</a></li>
  </ul>
</nav>
<header>
  <img src="<?php echo $userP ; ?>" alt="" align="middle" height= 100px;>

</header>
<div class="page-header">
    <h1 style="color:black">Hello, <b><?php echo $userN; ?></b>. Welcome Back.</h1>
</div>
<body style="color:black">
  <h2 >Select Element to Sort By</h2>
<p >The select element defines a drop-down list:</p>
  <form method = "POST">
  <select name="BoardSize">
    <option value="4">4</option>
    <option value="6">6</option>
    <option value="8">8</option>
  </select>
  <select name="category">
    <option value="score">score</option>
    <option value="time">time</option>
  </select>
  <select name="order">
    <option value="ascending">ascending</option>
    <option value="descending">descending</option>
  </select>
  <br><br>
  <input type="submit">
</form>
  <section>
  <table  width=100%>
    <tr>
      <th>Profile Picture</th>
      <th>Player</th>
      <th>Game Mode</th>
      <th>Board Size</th>
      <th>Game Duration</th>
      <th>Score</th>
    </tr>
  </section>


<?php

$conn = mysqli_connect("localhost", "root", "", "demo");
// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}
$userN = $_SESSION["username"];
//echo '$userN';
if($bSize == 4 ){
  if($category == 'score'){
    if($order == 'ascending'){
      $sql = "SELECT id, username, gameMode, gridSize, gridSize, gameDuration, score,profilePicture FROM games WHERE gridSize='$bSize' ORDER BY score ASC ";
    }
    else{
      $sql = "SELECT id, username, gameMode, gridSize, gridSize, gameDuration, score,profilePicture FROM games WHERE gridSize='$bSize' ORDER BY score DESC ";
    }
  }
  if($category == 'time'){
    if($order == 'ascending'){
      $sql = "SELECT id, username, gameMode, gridSize, gridSize, gameDuration, score,profilePicture FROM games WHERE gridSize='$bSize' ORDER BY score ASC ";
    }
    else{
      $sql = "SELECT id, username, gameMode, gridSize, gridSize, gameDuration, score,profilePicture FROM games WHERE gridSize='$bSize' ORDER BY score DESC ";
    }
  }
}//end boardsize 4

if($bSize == 6 ){
  if($category == 'score'){
    if($order == 'ascending'){
      $sql = "SELECT id, username, gameMode, gridSize, gridSize, gameDuration, score, profilePicture  FROM games WHERE gridSize='$bSize' ORDER BY score ASC ";
    }
    else{
      $sql = "SELECT id, username, gameMode, gridSize, gridSize, gameDuration, score,profilePicture FROM games WHERE gridSize='$bSize' ORDER BY score DESC ";
    }
  }
  if($category == 'time'){
    if($order == 'ascending'){
      $sql = "SELECT id, username, gameMode, gridSize, gridSize, gameDuration, score,profilePicture FROM games WHERE gridSize='$bSize' ORDER BY score ASC ";
    }
    else{
      $sql = "SELECT id, username, gameMode, gridSize, gridSize, gameDuration, score,profilePicture FROM games WHERE gridSize='$bSize' ORDER BY score DESC ";
    }
  }
}//end boardsize 6

if($bSize == 8 ){
  if($category == 'score'){
    if($order == 'ascending'){
      $sql = "SELECT id, username, gameMode, gridSize, gridSize, gameDuration, score, profilePicture FROM games WHERE gridSize='$bSize' ORDER BY score ASC ";
    }
    else{
      $sql = "SELECT id, username, gameMode, gridSize, gridSize, gameDuration, score, profilePicture FROM games WHERE gridSize='$bSize' ORDER BY score DESC ";
    }
  }
  if($category == 'time'){
    if($order == 'ascending'){
      $sql = "SELECT id, username, gameMode, gridSize, gridSize, gameDuration, score ,profilePicture FROM games WHERE gridSize='$bSize' ORDER BY score ASC ";
    }
    else{
      $sql = "SELECT id, username, gameMode, gridSize, gridSize, gameDuration, score, profilePicture FROM games WHERE gridSize='$bSize' ORDER BY score DESC ";
    }
  }
}//end boardsize 8


$result = $conn->query($sql);
if ($result->num_rows > 0) {
// output data of each row
while($row = $result->fetch_assoc()) {
if($row["profilePicture"] ==""){
  $row["profilePicture"] = "default.png";
}
echo "<tr><td>"
. '<img src="' . $row["profilePicture"] . '" alt="default.png" ,width=100px, height=100px /><br>'. "</td><td>"
. $row["username"] . "</td><td>"
. $row["gameMode"]. "</td> <td>"
. $row["gridSize"]. "</td><td>"
. $row["gameDuration"]. "</td><td>"
. $row["score"]. "</td></tr>";
}
echo "</table>";
} else { echo "0 results"; }

$conn->close();
?>
  </table>
</body>

</html>
