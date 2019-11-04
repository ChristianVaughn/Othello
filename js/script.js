function renderLevel(tableSize) {

    var myTable = document.createElement('table');
    myTable.setAttribute('id', 'main-table');

    var gameWrap = document.getElementById('game-board');
    while (gameWrap.firstChild) {
        gameWrap.removeChild(gameWrap.firstChild);
      }
    gameWrap.appendChild(myTable);

    for (let i = 0; i < tableSize; i++) {


        let row = document.createElement('tr');
        myTable.appendChild(row);

        for (let j = 0; j < tableSize; j++) {

            let cell = document.createElement('td');
            //if ((i !== 0) && (j !== 0)) {
                //cell.innerHTML = (j-1)+','+(i-1);
                //cell.innerHTML='<p class="hidden-values">123<p>';

                cell.innerHTML = '<span class="disc"></span>';
                // j = x, i = y
                cell.setAttribute('class', 'cell empty ');
                cell.setAttribute('onclick', 'clickCell(' + (j + 1) + ',' + (i + 1) + ')');
                cell.setAttribute('data-x', j + 1);
                cell.setAttribute('data-y', i + 1);
                cell.setAttribute('data-clicked', 'false');
                if ((j === tableSize/2 -1 && i === tableSize/2-1) || (j === tableSize/2  && i === tableSize/2)) {
                    cell.setAttribute('class', 'cell white ');
                }
                if ((j === tableSize/2 -1 && i === tableSize/2) || (j === tableSize/2  && i === tableSize/2-1)) {
                    cell.setAttribute('class', 'cell black ');
                }
            /*} else {
                if (i === 0 && j === 0) {
                    cell.innerHTML = '';
                    //cell.setAttribute('id', 'top-left-cell');
                } else {

                    if (i === 0) {
                        let markCountString = markCountCols[j - 1].toString();
                        markCountString = markCountString.split(/[ ,]+/).join('<br>')
                        cell.innerHTML = markCountString;
                        //cell.innerHTML=123;
                        cell.setAttribute("class", "outside-cell outside-cell-top");
                    } else {

                        let markCountString = markCountRows[i - 1].toString();
                        markCountString = markCountString.split(/[ ,]+/).join(' ')
                        cell.innerHTML = markCountString;
                        //cell.innerHTML=123;
                        cell.setAttribute("class", "outside-cell outside-cell-left");
                    }
                }
            }*/
            row.appendChild(cell);
        }
    }
} 


function ChangeBoardColor() {
    var boardColor = $('[name="board-color"]').val();
    var p1Color = $('[name="P1-color"]').val();
    var p2Color = $('[name="P2-color"]').val();
    $("#game-board > table .cell").css("background", boardColor);
    $("#game-board > table .cell.white > .disc").css("background", p1Color);
    $("#game-board > table .cell.black > .disc").css("background", p2Color);



}

