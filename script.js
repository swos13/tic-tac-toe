function createPlayer (name, marker) {
    this.name = name;
    this.marker = marker;

    const makeMove = () => {

    }
    return {name, marker, makeMove}
}

const gameBoard = (() => {

    const board = [["","",""], ["","",""], ["","",""]]
    let playerOne;
    let playerTwo;

    const startGame = (nameOne, nameTwo) => {
        playerOne = createPlayer(nameOne, "O");
        playerTwo = createPlayer(nameTwo, "X");
        displayBoard(nameOne, nameTwo);
    }

    const checkWinCondition = (player) => {

    }
    return(startGame, checkWinCondition)
})();

const displayController = (() => {

    const board = [];
    const gameContainer = document.querySelector('.gameContainer');

    const createBoard = () => {
        let boardContainer = document.createElement('div');
        boardContainer.classList.add("boardContainer");
        for(let i=0; i<3; i++){
            let row = [];
            for(let j=0; j<3; j++){
                let field = document.createElement('div');
                field.id = `${i+1}${j+1}`;
                field.classList.add("field");
                boardContainer.appendChild(field);
                row.push(field);
            }
            board.push(row);
        }
        gameContainer.appendChild(boardContainer);
    }
    const displayBoard = (nameOne, nameTwo) => {
        let boardContainer = createBoard();
    }
    const displayMarker = (field, player) => {

    }
    const clearBoard = () => {

    }
    return {createBoard, displayBoard, displayMarker, clearBoard};
})();

