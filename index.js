/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
const winnerBanner = document.querySelector(".winner");
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum % 2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if (gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="' + colIdx + '" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    // compute state of grid on each box click

    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    const currentValue = grid[colIdx][rowIdx];

    // an existing grid block may not be reassigned.
    // if the value of the box is 0, it means a move on this
    // box hasn't been made.
    if (currentValue === 0) {
        turn = turn === 'X' ? 'O' : 'X';
        let newValue = turn === 'X' ? 2 : 1;
        grid[colIdx][rowIdx] = newValue;
        renderMainGrid();
        addClickHandlers();
    }

    // row check
    for (let rowIndex = 0; rowIndex < GRID_LENGTH; rowIndex++) {
        const currentRow = grid[rowIndex];

        let playerOneWinner = currentRow.filter(number => number === 1).length === currentRow.length;
        let computerWinner = currentRow.filter(number => number === 2).length === currentRow.length;

        if (playerOneWinner) {
            winnerBanner.classList.remove('hidden');
            winnerBanner.innerHTML = 'Player One, Congratulations!';
            break;
        }

        if (computerWinner) {
            winnerBanner.classList.remove('hidden');
            winnerBanner.innerHTML = 'Player One, sorry! The computer got you on this one.';
            break;
        }
    }

    for (let index = 0; index < GRID_LENGTH; index++) {
        let winner = searchColumnsForWinner(index, grid);

        if (winner > 0) {
            displayWinner(winner);
            break;
        }
    }

    // search left and right diagonals
    let left = searchLeftDiagonal(grid);
    let right = searchRightDiagonal(grid);

    if (left > 0) {
        displayWinner(left);
    } else if (right > 0) {
        displayWinner(right);
    }
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

/**
 * Diplay the winner on the page
 * @param {Number} winner 
 */
function displayWinner(winner) {
    if (winner === 0) return;

    const playerOneWinnerText = 'Player One, Congratulations!';
    const computerWinnerText = 'Player One, sorry! The computer got you on this one.';

    winnerBanner.classList.remove('hidden');
    winnerBanner.innerHTML = winner === 1 ? playerOneWinnerText : computerWinnerText;
}

/**
 * Scan each column and check if there exists a winner
 * @param {Number} colIndex 
 * @param {Array[][]} grid 
 */
function searchColumnsForWinner(colIndex, grid) {
    let itemsInCol = [];

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        const currentItem = grid[rowIndex][colIndex];
        itemsInCol.push(currentItem);
    }

    let player = itemsInCol.filter(number => number === 1).length === GRID_LENGTH;
    let computer = itemsInCol.filter(number => number === 2).length === GRID_LENGTH;

    if (player) {
        return 1;
    } else if (computer) {
        return 2;
    } else {
        return 0;
    }
}

/**
 * Scan the left diagonal from the left top right bottom
 * @param {Array[][]} grid 
 */
function searchLeftDiagonal(grid) {
    let rowIndex = 0;
    let colIndex = 0;
    let itemsInDiagonal = [];
    while (rowIndex < GRID_LENGTH && colIndex < GRID_LENGTH) {
        itemsInDiagonal.push(grid[rowIndex][colIndex]);
        rowIndex++;
        colIndex++;
    }

    let player = itemsInDiagonal.filter(number => number === 1).length === GRID_LENGTH;
    let computer = itemsInDiagonal.filter(number => number === 2).length === GRID_LENGTH;

    if (player) {
        return 1;
    } else if (computer) {
        return 2;
    } else {
        return 0;
    }
}

/**
 * Scan the right diagonal from the right top to the left bottom
 * @param {Array[][]} grid 
 */
function searchRightDiagonal(grid) {
    let rowIndex = 0;
    let colIndex = GRID_LENGTH - 1;
    let itemsInDiagonal = [];
    while (rowIndex < GRID_LENGTH && colIndex >= 0) {
        itemsInDiagonal.push(grid[rowIndex][colIndex]);
        rowIndex++;
        colIndex--;
    }

    let player = itemsInDiagonal.filter(number => number === 1).length === GRID_LENGTH;
    let computer = itemsInDiagonal.filter(number => number === 2).length === GRID_LENGTH;

    if (player) {
        return 1;
    } else if (computer) {
        return 2;
    } else {
        return 0;
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
