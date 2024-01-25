function createPlayer (name, marker) {
    this.name = name;
    this.marker = marker;

    const makeMove = () => {

    }
    return {name, marker, makeMove}
}

const gameBoard = (() => {

    const playerOne;
    const playerTwo;

    const startGame = (nameOne, nameTwo) => {
        playerOne = createPlayer(nameOne, "O");
        playerTwo = createPlayer(nameTwo, "X");
        displayBoard();
    }

    const checkWinCondition = (player) => {

    }
    return(startGame, checkWinCondition)
})();

const displayController = (() => {
    const displayBoard = () => {

    }
    const displayMarker = (field, player) => {

    }
    const clearBoard = () => {

    }
    return(displayBoard, displayMarker, clearBoard)
})();

