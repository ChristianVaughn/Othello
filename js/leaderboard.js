var tableHead = '<thead><tr><th class ="tablehead" colspan="5"><h2 id=scoreHead>4x4 Grid<h2></th></tr></thead><tr class="colheader"><th><h4>Id</h4></th><th onclick="sortList(0);"><h4>Player</h4></th><th onclick="sortList(1);"><h4>Game Mode</h4></th><th onclick="sortList(2);"><h4>Game Duration</h4></th><th onclick="sortList(3);"><h4>Score</h4></th></tr>'
var scoreboard = null;
var scoreboard8 = null;
var scoreboard6 = null;
var scoreboard4 = null;
var cat = "4x4 Grid";
var decend = true;
var sortType = "";


function loadScores() {

    $.get("php/queryLeaderboard.php", { board: '4' })
        .done(function (data) {
            if (data === "Error") {
                reloadTable();
                return;
            }
            scoreboard4 = JSON.parse(data);
            scoreboard = scoreboard4;
            reloadTable();

        });
    $.get("php/queryLeaderboard.php", { board: '6' })
        .done(function (data) {
            if (data === "Error") {

                return;
            }
            scoreboard6 = JSON.parse(data);


        });
    $.get("php/queryLeaderboard.php", { board: '8' })
        .done(function (data) {
            if (data === "Error") {
                return;
            }
            scoreboard8 = JSON.parse(data);


        });


}
function loadUser(username) {
    $.get("php/queryUser.php", { user: username })
        .done(function (data) {
            if (data === "Error") {
                return;
            }
            var card = document.getElementById('profileCard');

            while (card.firstChild) {
                card.removeChild(card.firstChild);
            }
            var userinfo = JSON.parse(data);
            console.log(data);
            $.each(userinfo, function (index, element) {
                var img = document.createElement('img');
                var name = document.createElement('h1');
                var user = document.createElement('p');
                var age = document.createElement('p');
                var gender = document.createElement('p');
                var loc = document.createElement('p');
                var button = document.createElement('button');

                img.setAttribute('src', "./profilepics/" + element.pfp);
                img.setAttribute('alt', 'default.png');
                img.setAttribute('style', 'width:100%');
                user.setAttribute('class', 'title');
                button.setAttribute('onclick', 'hideProfile();')

                user.textContent = element.username;
                name.textContent = '' + element.firstname + " " + element.lastname;
                age.textContent = 'Age: ' + element.age;
                gender.textContent = 'Gender: ' + element.gender;
                loc.textContent = 'Location: ' + element.location;
                button.textContent = 'Close';


                card.appendChild(img);
                card.appendChild(name);
                card.appendChild(user);
                card.appendChild(age);
                card.appendChild(gender);
                card.appendChild(loc);
                card.appendChild(button);


            });
            $("#profileCard").show(1000);
            $("#cardContainer").toggleClass("parentDisable");

        });
}
function hideProfile() {
    $("#profileCard").hide(1000);
    $("#cardContainer").toggleClass("parentDisable");
    var card = document.getElementById('profileCard');

    while (card.firstChild) {
        card.removeChild(card.firstChild);
    }
}

function reloadTable() {
    var table = document.getElementById('scoreTable');

    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    table.innerHTML = tableHead;
    $.each(scoreboard, function (index, element) {
        var row = document.createElement('tr');
        var imgtd = document.createElement('td');
        var img = document.createElement('img');
        var name = document.createElement('td');
        var mode = document.createElement('td');
        var score = document.createElement('td');
        var time = document.createElement('td');

        img.setAttribute('src', element.profilePicture);
        img.setAttribute('onclick', "loadUser(" + "'" + element.username + "');");

        img.setAttribute('alt', 'default.png');
        img.setAttribute('width', '100px');
        img.setAttribute('height', '100px');
        name.textContent = element.username;
        name.setAttribute('onclick', "loadUser(" + "'" + element.username + "');");
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
        if (sortType === "username") {
            decend = !decend;
        }
        else {
            sortType = "username";
        }
        if (decend) {
            scoreboard.sort((a, b) => (a.username.toLowerCase() > b.username.toLowerCase()) ? 1 : -1);
        }
        else {
            scoreboard.sort((a, b) => (a.username.toLowerCase() > b.username.toLowerCase()) ? -1 : 1);
        }
        reloadTable();
        $("#scoreHead").text(cat);

        console.log(scoreboard);
    }
    else if (sortby === 1) {
        if (sortType === "gameMode") {
            decend = !decend;
        }
        else {
            sortType = "gameMode";
        }
        if (decend) {
            scoreboard.sort((a, b) => (a.gameMode > b.gameMode) ? 1 : -1)
        }
        else {
            scoreboard.sort((a, b) => (a.gameMode > b.gameMode) ? -1 : 1)
        }
        reloadTable();
        $("#scoreHead").text(cat);

        console.log(scoreboard);
    }
    else if (sortby === 2) {
        if (sortType === "gameDuration") {
            decend = !decend;
        }
        else {
            sortType = "gameDuration";
        }
        if (decend) {
            scoreboard.sort((a, b) => (parseInt(a.gameDuration) > parseInt(b.gameDuration)) ? 1 : -1)
        }
        else {
            scoreboard.sort((a, b) => (parseInt(a.gameDuration) > parseInt(b.gameDuration)) ? -1 : 1)
        }
        reloadTable();
        $("#scoreHead").text(cat);

        console.log(scoreboard);
    }
    else if (sortby === 3) {
        if (sortType === "score") {
            decend = !decend;
        }
        else {
            sortType = "score";
        }
        if (decend) {
            scoreboard.sort((a, b) => (parseInt(a.score) > parseInt(b.score)) ? 1 : -1)
        }
        else {
            scoreboard.sort((a, b) => (parseInt(a.score) > parseInt(b.score)) ? -1 : 1)
        }
        reloadTable();
        $("#scoreHead").text(cat);

        console.log(scoreboard);
    }


}

function switchCat(category) {
    if (category === "4") {
        scoreboard = scoreboard4;
        cat = "4x4 Grid";
        reloadTable();
        $("#scoreHead").text("4x4 Grid");
    }
    else if (category === "6") {
        scoreboard = scoreboard6;
        cat = "6x6 Grid";

        reloadTable();
        $("#scoreHead").text("6x6 Grid");

    }
    else if (category === "8") {
        cat = "8x8 Grid";
        scoreboard = scoreboard8;
        reloadTable();
        $("#scoreHead").text("8x8 Grid");

    }
}