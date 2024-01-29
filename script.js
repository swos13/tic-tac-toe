function createPlayer(name, marker) {
    this.name = name;
    this.marker = marker;
    return {name, marker}
}

const gameBoard = (() => {

    let board;
    let whoseTurn = 'o';
    let turn;

    const startGame = (nameOne, nameTwo) => {
        board = [["","",""], ["","",""], ["","",""]]
        turn = 0;
        if(nameOne.trim() == "")
            nameOne = "Player 1";
        if(nameTwo.trim() == "")
            nameTwo = "Player 2";
        const playerOne = createPlayer(nameOne, "O");
        const playerTwo = createPlayer(nameTwo, "X");
        displayController.displayGame(playerOne, playerTwo);
    }
    const makeMove = (event) => {
        const firstCoordinate = parseInt(event.currentTarget.id[0]);
        const secondCoordinate = parseInt(event.currentTarget.id[1]);
        displayController.displayMarker(firstCoordinate, secondCoordinate, whoseTurn);
        board[firstCoordinate][secondCoordinate] = whoseTurn;
        turn++;
        if(checkWinCondition(whoseTurn,firstCoordinate,secondCoordinate) != null){
            displayController.displayEndMessage(`${whoseTurn} won!`);
        }
        else if(turn == 9){
            displayController.displayEndMessage(`It's a draw!`);
        }
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
        let winningLine = null;
        linesToCheck.forEach((line) => {
            let areTheSame = true;
            line.forEach((field) => {
                if(board[field[0]][field[1]] != marker)
                    areTheSame = false;
            })
            if(areTheSame)
                winningLine = line;
        })
        return winningLine;
    }
    return{startGame, makeMove, checkWinCondition}
})();

const displayController = (() => {

    let board = [];
    const gameContainer = document.querySelector('.game-container');

    const setup = () => {
        const newButton = document.querySelector(".new");
        const nameOneInput = document.querySelector("#name-one");
        const nameTwoInput = document.querySelector("#name-two");
        newButton.addEventListener('click', () => {
            gameBoard.startGame(nameOneInput.value, nameTwoInput.value);
        })
    }

    const createBoard = () => {
        if(board.length != 0)
            clearBoard();
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
    const displayEndMessage = (text) => {
        const message = document.querySelector('.result-message');
        message.textContent = text;
    }
    const clearBoard = () => {
        board = [];
        while(gameContainer.firstChild)
            gameContainer.removeChild(gameContainer.lastChild);
    }
    return {board, setup, createBoard, displayGame, displayMarker, displayEndMessage, clearBoard};
})();

displayController.setup();
