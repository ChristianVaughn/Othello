var tableHead =  '<tr><th>Id</th><th>Player</th><th>Game Mode</th><th>Game Duration</th><th>Score</th></tr>'
function loadScores() {
    $.get( "php/queryLeaderboard.php", { board: '4' } )
  .done(function( data ) {
    var scoreboard = JSON.parse(data);
    console.log(scoreboard);
    var table = document.getElementById('scoreTable');

    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    table.innerHTML = tableHead;
    $.each(scoreboard, function(index, element) {
        var row = document.createElement('tr');
        var imgtd = document.createElement('td');
        var img = document.createElement('img');
        var name = document.createElement('td');
        var mode = document.createElement('td');
        var score = document.createElement('td');
        var time = document.createElement('td');

        img.setAttribute('src', element.profilePicture);
        img.setAttribute('alt', 'default.png');
        img.setAttribute('width', '100px');
        img.setAttribute('height', '100px');
        name.textContent = element.username;
        mode.textContent = element.gameMode;
        time.textContent = element.gameDuration;
        score.textContent = element.score;


        imgtd.appendChild(img);
        row.appendChild(imgtd);
        row.appendChild(name);
        row.appendChild(mode);
        row.appendChild(time);
        row.appendChild(score);
        table.appendChild(row);




    
    });     
    
  });
    
}

