function createPlayer (name, marker) {
    this.name = name;
    this.marker = marker;
    return {name, marker}
}

const gameBoard = (() => {

    const board = [["","",""], ["","",""], ["","",""]]
    let playerOne;
    let playerTwo;
    let whoseTurn = 'o';

    const startGame = (nameOne, nameTwo) => {
        playerOne = createPlayer(nameOne, "O");
        playerTwo = createPlayer(nameTwo, "X");
        displayController.displayGame(playerOne, playerTwo);
    }
    const makeMove = (event) => {
        const firstCoordinate = parseInt(event.currentTarget.id[0]);
        const secondCoordinate = parseInt(event.currentTarget.id[1]);
        displayController.displayMarker(firstCoordinate, secondCoordinate, whoseTurn);
        board[firstCoordinate][secondCoordinate] = whoseTurn;
        if(checkWinCondition(whoseTurn,firstCoordinate,secondCoordinate))
            console.log(`${whoseTurn} won!`);
        whoseTurn = whoseTurn == 'o' ? 'x' : 'o';
    }
    const checkWinCondition = (marker, firstCoordinate, secondCoordinate) => {
        const possibleWinCombinations = [[[0,0],[0,1],[0,2]],[[1,0],[1,1],[1,2]],[[2,0],[2,1],[2,2]],
                                         [[0,0],[1,0],[2,0]],[[0,1],[1,1],[2,1]],[[0,2],[1,2],[2,2]],
                                         [[0,0],[1,1],[2,2]],[[2,0],[1,1],[0,2]]];
        const linesToCheck = possibleWinCombinations.filter((line) => {
            let contains = false;
            line.forEach((field) => {
                if(field[0] == firstCoordinate && field[1] == secondCoordinate)
                    contains = true; 
            })
            return contains;
        });
        let win = false;
        let winningLine = null;
        linesToCheck.forEach((line) => {
            let areTheSame = true;
            line.forEach((field) => {
                if(board[field[0]][field[1]] != marker)
                    areTheSame = false;
            })
            if(areTheSame){
                win = true;
                winningLine = line;
            }
        })
        return win;
    }
    return{startGame, makeMove, checkWinCondition}
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
                field.id = `${i}${j}`;
                field.classList.add("field");
                field.addEventListener('click', gameBoard.makeMove);
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
    const displayMarker = (firstCoordinate, secondCoordinate, marker) => {
        const field = board[firstCoordinate][secondCoordinate];
        field.textContent = marker;
        field.style.pointerEvents = "none";
    }
    const clearBoard = () => {

    }
    return {board, createBoard, displayGame, displayMarker, clearBoard};
})();

