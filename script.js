const board = document.querySelector(".board");
const retry = document.querySelector(".restart");
const gameStatus = document.querySelector(".status");
let turn = 'x';


const boardControl = (() => {
    const checkWinner = () => {
        let rows = document.querySelectorAll(".row");
        let cells = document.querySelectorAll(".row div");

        rows.forEach((row) => {
            count_x = 0;
            count_y = 0;
            let kids = row.children;
            for (let i = 0; i<kids.length; i++) {
                if (kids[i].textContent === 'y') {count_y++}
                else if (kids[i].textContent === 'x') {count_x++};
            }
            if (count_x === 3) {win('x'); return}
            else if (count_y === 3) {win('y'); return};
        })

        for (let i = 0; i<3; i++) {
            if (rows[0].children[i].textContent === '') continue;
            if (rows[0].children[i].textContent === rows[1].children[i].textContent && rows[1].children[i].textContent === rows[2].children[i].textContent) {
                win(rows[0].children[i].textContent)
            }
        }

        if (rows[0].children[0].textContent === rows[1].children[1].textContent && rows[1].children[1].textContent === rows[2].children[2].textContent) {
            if (rows[0].children[0].textContent !== '') {win(rows[1].children[1].textContent); return;}
        }
        if (rows[0].children[2].textContent === rows[1].children[1].textContent && rows[1].children[1].textContent === rows[2].children[0].textContent) {
            if (rows[0].children[2].textContent !== '') {win(rows[1].children[1].textContent); return;}
        }

        let full = 0;
        cells.forEach((cell) => {
            if(cell.textContent !== '') {full++};
        })
        if (full === 9) {tie(); return};
    }
    const win = (letter) => {
       gameStatus.textContent = `${letter} won`;
       won = true;
    }
    const tie = () => {
        gameStatus.textContent = `It's a tie!`;
        won = true
    }
    const place = (cell) => {
        if (cell.textContent === ''){
            cell.textContent = turn;
            turn === 'x' ? turn = 'y' : turn = 'x';
            gameStatus.textContent = `${turn}'s turn!`
            checkWinner();
        }
     };
    const clear = () => {
        let cells = document.querySelectorAll(".row div");
        cells.forEach((cell) => {
            cell.textContent = '';
        })
        console.log("clear");
        turn = 'x';
        gameStatus.textContent = `${turn}'s turn!`
    }
    let won = false;
    return {place, clear, won};
}
)()

const person = (name, score) => {
    return {name, score};
}

board.addEventListener('click', (e) => {
    if (boardControl.won) {return};
    if (e.target.parentNode.classList.contains("row")) {
        boardControl.place(e.target);
    };
})

retry.addEventListener('click', boardControl.clear);



