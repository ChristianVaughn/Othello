 <?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "demo";

require_once "config.php";
if($_GET["user"]){

    $user = ($_GET['user']);
    //echo $uname;
    
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    #SELECT pfp FROM users WHERE username = "";
    //$sql = "SELECT profilePicture, username, gameMode, gameDuration, score FROM games WHERE gridSize=4  ORDER BY score DESC ";
    $sql = "SELECT pfp, username, firstname, lastname, age, gender, location FROM users WHERE username='$user'  ORDER BY id DESC ";
    
    
    
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
