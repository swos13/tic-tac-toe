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
        displayController.displayGame(playerOne, playerTwo);
    }

    const checkWinCondition = (player) => {

    }
    return{startGame, checkWinCondition}
})();

const displayController = (() => {

    const board = [];
    const gameContainer = document.querySelector('.game-container');

    const createBoard = () => {
        let boardContainer = document.createElement('div');
        boardContainer.classList.add("board-container");
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
        return boardContainer;
    }
    const createPlayer = (name, marker) => {
        const playerContainer = document.createElement('div');
        const nameContainer = document.createElement('div');
        const markerContainer = document.createElement('div');

        playerContainer.classList.add('player-container');
        nameContainer.classList.add('name-container');
        markerContainer.classList.add('marker-container');

        nameContainer.textContent = name;
        markerContainer.textContent = marker;

        playerContainer.appendChild(nameContainer);
        playerContainer.appendChild(markerContainer);

        return playerContainer;
    }
    const displayGame = (playerOne, playerTwo) => {
        const playerOneDisplay = createPlayer(playerOne.name, playerOne.marker);
        const playerTwoDisplay = createPlayer(playerTwo.name, playerTwo.marker);
        const boardContainer = createBoard();
        gameContainer.appendChild(playerOneDisplay);
        gameContainer.appendChild(boardContainer);
        gameContainer.appendChild(playerTwoDisplay);
    }
    const displayMarker = (field, player) => {

    }
    const clearBoard = () => {

    }
    return {createBoard, displayGame, displayMarker, clearBoard};
})();

