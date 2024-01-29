function createPlayer(name, marker) {
    this.name = name;
    this.marker = marker;
    return {name, marker}
}

const game = (() => {

    let board;
    let whoseTurn;
    let turn;
    let playerOne;
    let playerTwo;

    const startGame = (nameOne, nameTwo) => {
        board = [["","",""], ["","",""], ["","",""]]
        whoseTurn = 'O';
        turn = 0;
        if(nameOne.trim() == "")
            nameOne = "Player 1";
        if(nameTwo.trim() == "")
            nameTwo = "Player 2";
        playerOne = createPlayer(nameOne, "O");
        playerTwo = createPlayer(nameTwo, "X");
        displayController.displayGame(playerOne, playerTwo);
        displayController.displayMessage(`${playerOne.name} turn`);
    }
    const makeMove = (event) => {
        const firstCoordinate = parseInt(event.currentTarget.id[0]);
        const secondCoordinate = parseInt(event.currentTarget.id[1]);
        displayController.displayMarker(firstCoordinate, secondCoordinate, whoseTurn);
        board[firstCoordinate][secondCoordinate] = whoseTurn;
        turn++;
        if(checkWinCondition(whoseTurn,firstCoordinate,secondCoordinate) != null){
            let winnerName = whoseTurn == playerOne.name ? playerOne.name : playerTwo.name;
            displayController.displayMessage(`${winnerName} won!`);
        }
        else if(turn == 9){
            displayController.displayMessage(`It's a draw!`);
        }
        else if(whoseTurn == 'O'){
            displayController.displayMessage(`${playerTwo.name} turn`);
            whoseTurn = 'X';
        }
        else{
            displayController.displayMessage(`${playerOne.name} turn`);
            whoseTurn = 'O';
        }
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
    return{startGame, makeMove}
})();

const displayController = (() => {

    let board = [];
    const gameContainer = document.querySelector('.game-container');
    const messageDisplay = document.querySelector('.message'); 

    const setUp = () => {
        const newButton = document.querySelector(".new");
        const nameOneInput = document.querySelector("#name-one");
        const nameTwoInput = document.querySelector("#name-two");
        newButton.addEventListener('click', () => {
            game.startGame(nameOneInput.value, nameTwoInput.value);
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
                field.addEventListener('click', game.makeMove);
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
    const displayMessage = (text) => {
        messageDisplay.textContent = text;
    }
    const clearBoard = () => {
        board = [];
        while(gameContainer.firstChild)
            gameContainer.removeChild(gameContainer.lastChild);
    }
    return {setUp, displayGame, displayMarker, displayMessage};
})();

displayController.setUp();
