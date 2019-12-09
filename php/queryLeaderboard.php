<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "demo";

require_once "config.php";
if($_GET["board"]){

$board = ($_GET['board']);
//echo $uname;


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
#SELECT pfp FROM users WHERE username = "";
//$sql = "SELECT profilePicture, username, gameMode, gameDuration, score FROM games WHERE gridSize=4  ORDER BY score DESC ";
$sql = "SELECT profilePicture, username, gameMode, gridSize, gridSize, gameDuration, score FROM games WHERE gridsize='$board'  ORDER BY id DESC ";



$result = $conn->query($sql);
if ($result->num_rows > 0) {
    $rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
    echo json_encode($rows);
}
 else {
    echo "Error";
}

$conn->close();
}


?>
