<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "demo";

require_once "config.php";

if($_POST["username"]){

$uname = ($_POST['username']);
echo $uname;
$gmode = ($_POST['gamemode']);
echo $gmode;
$gridsize = ($_POST['boardsize']);
echo $gridsize;
$globaltimer = ($_POST['globaltimer']);
echo $globaltimer;
$p1score = ($_POST['p1score']);
echo $p1score;
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO games (username, gameMode, gridSize, gameDuration, score)
VALUES ('$uname', '$gmode', $gridsize, $globaltimer, $p1score )";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();



/*$sql = "INSERT INTO games (username, gmode, gridsize, globaltimer, p1score) VALUES (?, ?, ?, ?, ?)";
if($stmt = mysqli_prepare($link, $sql)){
    // Bind variables to the prepared statement as parameters
    mysqli_stmt_bind_param($stmt, "sdddd", $param_username, $param_gmode, $param_gridsize, $param_globaltimer, $param_p1score );

    // Set parameters
    $param_username = $uname;
    $param_gmode = $gmode;
    $param_gridsize = $gridsize;
    $param_globaltimer = $globaltimer;
    $param_p1score = $p1score;


    // Attempt to execute the prepared statement
    if(mysqli_stmt_execute($stmt)){
        // Redirect to login page
        header("location: index.php");
    } else{
        echo "Something went wrong. Please try again later.";
    }
}

// Close statement
mysqli_stmt_close($stmt);
*/

?>
