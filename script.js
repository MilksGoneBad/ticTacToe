let body = document.querySelector('body');
let playerOnesTurn = true;
let boardStateArray = [0,0,0,0,0,0,0,0,0];
let opponentMode = "simpleAI";
let boardStateObjects = document.getElementsByClassName("cell");

const gameBoard = () => {

    const countOpenSquares = () => {
        let zeroesCounted = 0;
        boardStateArray.forEach(function(item){
            if (item == 0) {zeroesCounted++;}
        })
        return zeroesCounted;
    }

    const aiMove = () => {
        switch (opponentMode) {
            case "simpleAI":
                let choice = Math.floor(Math.random() * countOpenSquares());
                let counter = 0;
                var result;
                for (i = 0; i < boardStateArray.length; i++) {
                    if (boardStateArray[i] == 0) {
                    if (counter == choice) {result = i};
                    counter++;
                    }
                }
                return boardStateObjects[result];
            break;
            case "complexAI":

            break;
            case "human":

            break;
        }
    }

    const addMarkHandler = (e) => {

    }

    //function to add XO to grid, change active player, assign graphic
    const addMark = (e) => {
        if(e.target.className == "cell gameSquare") {
                e.target.className = "cell clicked";
                e.target.innerText = playerOnesTurn == true ? "X" : "O";
                boardStateArray[e.target.getAttribute('id')-1] = playerOnesTurn == true ? 1 : -1;
                playerOnesTurn = playerOnesTurn == true ? false : true;
                //should now call appropriate AI function to fill next square or pass turn
                //to the other human player
                //if (playerOnesTurn == false) {addMark(aiMove())};
            }
    }
    return {addMark, aiMove, countOpenSquares, addMarkHandler};    

};




const players = () => {



};

const gameEngine = () => {

    //simple AI to fill random square after player chooses square
 
    //smart AI

    let winner = ""; 
    const checkHorizontals = (arr) => {
        let result = 0;
        for (i = 1; i < boardStateArray.length+1; i++) {
            result += boardStateArray[i-1];
            if (result == 3) { winner = "Player One" };
            if (result == -3) { winner = "Player Two" };
            if (i % 3 === 0) {result = 0};
        }
    }
    const checkVerticals = (arr) => {
    for (j = 1; j < 4; j++) {
        let result = 0;
        for (i = j; i < boardStateArray.length+1; i=i+3) {
            result += boardStateArray[i-1];
            if (result == 3) { winner = "Player One" };
            if (result == -3) { winner = "Player Two" };
        }
    }
}
    const checkDiagonals = (arr) => {
        let diagOne = boardStateArray[0] + boardStateArray[4] + boardStateArray[8];
        let diagTwo = boardStateArray[2] + boardStateArray[4] + boardStateArray[6];
        if (diagOne == 3 || diagTwo == 3) { winner = "Player One" };
        if (diagOne == -3 || diagTwo == -3) { winner = "Player Two" };
    }
    return {checkHorizontals, checkVerticals, checkDiagonals};
};

let board = gameBoard();
let engine = gameEngine();
body.addEventListener('click', board.addMarkHandler);
body.addEventListener('click', engine.checkHorizontals);
body.addEventListener('click', engine.checkVerticals);
body.addEventListener('click', engine.checkDiagonals);