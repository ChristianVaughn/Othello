function renderLevel(level) {

    var myTable = document.createElement('table');
    myTable.setAttribute('id', 'main-table');

    var gameWrap = document.getElementById('gameDiv');
    gameWrap.appendChild(myTable);

    for (let i = 0; i < level.length + 1; i++) {


        let row = document.createElement('tr');
        myTable.appendChild(row);

        for (let j = 0; j < level.length + 1; j++) {

            let cell = document.createElement('td');
            if ((i !== 0) && (j !== 0)) {
                //cell.innerHTML = (j-1)+','+(i-1);
                //cell.innerHTML='<p class="hidden-values">123<p>';

                cell.innerHTML = '<p class="hidden-values">' + level[i - 1][j - 1] + '</p>';
                // j = x, i = y
                cell.setAttribute('class', 'inner-cell');
                cell.setAttribute('onclick', 'clickCell(' + (j - 1) + ',' + (i - 1) + ')');
                cell.setAttribute('data-x', j - 1);
                cell.setAttribute('data-y', i - 1);
                cell.setAttribute('data-clicked', 'false');
                if (j === level.length) {
                    cell.setAttribute('class', 'inner-cell inner-cell-right');
                }
                if (i === level.length) {
                    cell.setAttribute('class', 'inner-cell inner-cell-bottom');
                }
                if (i === level.length && j === level.length) {
                    cell.setAttribute('class', 'inner-cell inner-cell-bottom-right');
                }

            } else {
                if (i === 0 && j === 0) {
                    cell.innerHTML = '';
                    cell.setAttribute('id', 'top-left-cell');
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
            }
            row.appendChild(cell);
        }
    }
}