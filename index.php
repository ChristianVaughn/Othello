<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
	header("location: php/login.php");
	exit;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<title>Reversi</title>
	<link href="./css/style.css" rel="stylesheet">
</head>

<body onload="renderLevel(8);">
	<nav>
		<ul>
			<li><a href="leaderboard.php">Home</a></li>
			<li><a class="active" href="index.php">Game</a></li>
			<li><a href="howto.php">How To Play</a></li>
			<li><a href="about.php">About</a></li>
			<li style="float:right"><a href="php/logout.php">Log Out</a></li>
			<li style="float:right"><a href="php/reset-password.php">Account</a></li>

		</ul>
	</nav>
	<div id="main" class="container">
		<div id="game-board">

		</div>
		<br>
		<section id="game-options">
			<p style="display: inline;color: black;">Board Size</p>
			<br>
			<br>
			<button onclick="renderLevel(4);">4x4</button>
			<button onclick="renderLevel(6);">6x6</button>
			<button onclick="renderLevel(8);">8x8</button>
			<br>
			<p style="color: black;display: inline-block;">Game Mode</p>
			<br>
			<span class="custom-dropdown">
				<select name="gamemode" onchange="setGameMode(this.value)">
					<option value="1">Easy CPU Game</option>
					<option value="2">Hard CPU Game</option>
					<option value="0">2P Game</option>

				</select>
			</span>
			<!--	<input checked="" class="sw2 sw2-success sw2-lg" type="checkbox" onchange="setGameMode(this.checked)"> -->
			<br>
			<p style="color: black;display: inline-block;">Board:</p>
			<div class="input-color-container">
				<input name="board-color" value="#5cb85c" class="input-color" type="color" onchange="boardColorChange(this)">
			</div>
			<br>
			<p style="color: black;display: inline-block;">Player1:</p>
			<div class="input-color-container">
				<input name="P1-color" value="#000000" class="input-color" type="color" onchange="p1ColorChange(this.value)">
			</div>
			<br>
			<p style="color: black;display: inline-block;">Player2:</p>
			<div class="input-color-container">
				<input name="P2-color" value="#FFFFFF" class="input-color" type="color" onchange="p2ColorChange(this.value)">
			</div>
			<br>
			<button onclick="gameStart();">start</button>
		</section>
		<section>
			<table class="scoreboard">
				<td class="block">
					<p id="p1Name"><?php echo $_SESSION['username']; ?></p>
				</td>
				<td class="block">
					<p id="p1Score">2</p>
				</td>
				<td class="block">
					<p id="time">00:00</p>
				</td>
				<td class="block">
					<p id="p2Score">2</p>
				</td>
				<td class="block">
					<p id="p2Name">Player 2</p>
				</td>
			</table>
		</section>
		<div id="match-details-curtain" style="display:none;">
			<div id="match-details-container">
				<div id="title">Game Over</div>
				<div id="teams-container">
					<div class="play1 flexbox-items">
						<div class="play1 logo"></div>
						<br />
						<div class="play1 name"></div>
					</div>
					<div class="flexbox-items">
						<div id="matchTime"></div>
						<div id="matchMode"></div>
						<br />
					</div>
					<div class="play2 flexbox-items">
						<div class="play2 logo"></div>
						<br />
						<div class="play2 name"></div>
					</div>
				</div>
				<div id="score-container">
					<div class="play1 score"></div>
					<div class="play2 score"></div>
				</div>
				<hr id="bottom-devider" />
				<div id="close-details"></div>
			</div>
		</div>
	</div>

</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="js/script.js"></script>

</html>