<?php
if($_POST["username"]){

$uname = json_decode($_POST['username']);
echo $uname;
$gmode = json_decode($_POST['gamemode']);
echo $gmode;
$gridsize = json_decode($_POST['boardsize']);
echo $gridsize;
$globaltimer = json_decode($_POST['globaltimer']);
echo $globaltimer;
$p1score = json_decode($_POST['p1score']);
echo $p1score;
}

?>
