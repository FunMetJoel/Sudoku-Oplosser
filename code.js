
var sudoku = [];
var newSudoku = [];

function showSudocuSolverDiv() {
    const sudocuSolverDiv = document.getElementById('sudocu-solver');
    const sudocuSelectDiv = document.getElementById('sudocu-select');
    sudocuSolverDiv.style.display = 'block';
    sudocuSelectDiv.style.display = 'none';
}

function generateSudocuTable(size) {
    const table = document.getElementById('sudoku');
    table.classList.add(`size${size}`);

    for (let i = 0; i < size; i++) {
        sudoku.push([]);
        const row = document.createElement('tr');
        for (let j = 0; j < size; j++) {
            if (size == 4) {
                sudoku[i].push([1,2,3,4]);
            }else if (size == 6) {
                sudoku[i].push([1,2,3,4,5,6]);
            }else if (size == 9) {
                sudoku[i].push([1,2,3,4,5,6,7,8,9]);
            }


            const cell = document.createElement('td');
            cell.id = `cell-${i}-${j}`;
            cell.className = 'cell';
            row.appendChild(cell);
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `input-${i}-${j}`;
            input.min = 1;
            input.max = size;
            input.className = 'input';
            cell.appendChild(input);
        }
        table.appendChild(row);
    }

    console.log(sudoku);
}

function fillSudocuTable() {
    const size = document.getElementById('size').value;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const input = document.getElementById(`input-${i}-${j}`);
            if (sudoku[i][j].length === 1) {
                input.value = sudoku[i][j][0];
                input.disabled = true;
            }
        }
    }
}

function generateSudoku() {
    const size = document.getElementById('size').value;
    showSudocuSolverDiv();
    generateSudocuTable(size);
    fillSudocuTable();
}

function confirmInputs() {
    const size = document.getElementById('size').value;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const input = document.getElementById(`input-${i}-${j}`);
            if (input.value !== '') {
                sudoku[i][j] = [parseInt(input.value)];
            }
        }
    }
    console.log(sudoku);

    fillSudocuTable();
}

function volgendeStap() {
    const size = document.getElementById('size').value;
    newSudoku = sudoku;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (sudoku[i][j].length > 1) {
                checkRow(i, j);
                checkGroup(i, j);
            }
        }
    }
    
    console.log(sudoku);
    fillSudocuTable();
}

function checkRow(row, colomn) {
    const size = document.getElementById('size').value;
    for (let i = 0; i < size; i++) {
        if (i !== colomn && sudoku[row][i].length === 1) {
            newSudoku[row][colomn] = sudoku[row][colomn].filter(value => value !== sudoku[row][i][0]);
        }
        if (i !== row && sudoku[i][colomn].length === 1) {
            newSudoku[row][colomn] = sudoku[row][colomn].filter(value => value !== sudoku[i][colomn][0]);
        }
    }

    for (let i = 0; i < sudoku[row][colomn].length; i++) {
        console.log("num" + sudoku[row][colomn][i]);
        console.log(isNumberInRow(row, colomn, size, sudoku[row][colomn][i]));
        console.log(isNumberInColomn(row, colomn, size, sudoku[row][colomn][i]));
        if (!isNumberInRow(row, colomn, size, sudoku[row][colomn][i])) {
            newSudoku[row][colomn] = [sudoku[row][colomn][i]];
            return;
        }
        if (!isNumberInColomn(row, colomn, size, sudoku[row][colomn][i])) {
            newSudoku[row][colomn] = [sudoku[row][colomn][i]];
            return;
        }
    }
}

function isNumberInRow(row, colomn, size, number) {
    for (let j = 0; j < size; j++) {
        if (j !== colomn && newSudoku[row][j].includes(number)) {
            return true;
        }
    }
    return false;
}

function isNumberInColomn(row, colomn, size, number) {
    for (let i = 0; i < size; i++) {
        if (i !== colomn && newSudoku[i][colomn].includes(number)) {
            return true;
        }
    }
    return false;
}

function checkGroup(row, colomn) {
    const size = document.getElementById('size').value;
    const groupSize = Math.sqrt(size);
    const startRow = Math.floor(row / groupSize) * groupSize;
    const startColomn = Math.floor(colomn / groupSize) * groupSize;
    for (let i = startRow; i < startRow + groupSize; i++) {
        for (let j = startColomn; j < startColomn + groupSize; j++) {
            if (i !== row && j !== colomn && sudoku[i][j].length === 1) {
                newSudoku[row][colomn] = newSudoku[row][colomn].filter(value => value !== sudoku[i][j][0]);
            }
        }
    }


}