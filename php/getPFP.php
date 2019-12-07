<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "demo";

require_once "config.php";

if($_GET["username"]){

$uname = ($_GET['username']);
//echo $uname;


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
#SELECT pfp FROM users WHERE username = "";

$sql = "SELECT `pfp` FROM `users` WHERE username = '$uname'";


$result = $conn->query($sql);
if ($result->num_rows > 0) {
    $rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
    echo json_encode($rows);
}
 else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
}


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
