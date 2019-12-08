var tableHead =  '<tr><th>Id</th><th onclick="sortList(0);">Player</th><th onclick="sortList(1);">Game Mode</th><th onclick="sortList(2);">Game Duration</th><th onclick="sortList(3);">Score</th></tr>'
var scoreboard = null;
var scoreboard8= null;
var scoreboard6 = null;
var scoreboard4 = null;


function loadScores() {
    $.get( "php/queryLeaderboard.php", { board: '4' } )
  .done(function( data ) {
    scoreboard4 = JSON.parse(data);
    scoreboard = scoreboard4;
    reloadTable();
    
  });
  $.get( "php/queryLeaderboard.php", { board: '6' } )
  .done(function( data ) {
    scoreboard6 = JSON.parse(data);

    
  });
  $.get( "php/queryLeaderboard.php", { board: '8' } )
  .done(function( data ) {
    scoreboard8 = JSON.parse(data);

    
  });

    
}

function reloadTable() {
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
}

function sortList(sortby) {
    if (sortby === 0) {
        scoreboard.sort((a, b) => (a.username > b.username) ? 1 : -1)
        reloadTable();
        console.log(scoreboard);
    }
    else if(sortby === 1) {
        scoreboard.sort((a, b) => (a.gameMode > b.gameMode) ? 1 : -1)
        reloadTable();
        console.log(scoreboard);
    }
    else if(sortby === 2) {
        scoreboard.sort((a, b) => (a.gameDuration > b.gameDuration) ? 1 : -1)
        reloadTable();
        console.log(scoreboard);
    }
    else if(sortby === 3) {
        scoreboard.sort((a, b) => (a.score > b.score) ? 1 : -1)
        reloadTable();
        console.log(scoreboard);
    }
   

}

function switchCat(category) {
    if (category === 4) {
        scoreboard = scoreboard4;
        reloadTable();
    }
    else if (category === 6) {
        scoreboard = scoreboard6;
        reloadTable();
    }
    else if (category === 8) {
        scoreboard = scoreboard8;
        reloadTable();
    }
}