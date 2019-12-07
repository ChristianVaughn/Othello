<!DOCTYPE html>
<html>

<head>
  <title>Table with database</title>
  <style>
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
  </style>
</head>

<body>
  <table  width=100%>
    <tr>
      <th>Id</th>
      <th>Player</th>
      <th>Game Mode</th>
      <th>Board Size</th>
      <th>Game Duration</th>
      <th>Score</th>
    </tr>
    <?php
$conn = mysqli_connect("localhost", "root", "", "demo");
// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT id, username, gameMode, gridSize, gridSize, gameDuration, score FROM games ORDER BY id DESC ";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
// output data of each row
while($row = $result->fetch_assoc()) {
echo "<tr><td>"
. $row["id"]. "</td><td>"
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
