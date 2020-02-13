let body = document.querySelector('body');
let playerOnesTurn = true;
let boardStateArray = [0,0,0,0,0,0,0,0,0];
let opponentMode = "simpleAI";
let difficulty = 9;
let boardStateObjects = document.getElementsByClassName("cell");
let play = document.getElementById("play_button");
let mainMenu = document.getElementById("main_menu");
let displayMenu = true;
let ticC = document.getElementsByClassName("tic_container")[0];
let gameC = document.getElementsByClassName("game_container")[0];
let mainC = document.getElementsByClassName("main_container")[0];

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
let engine = gameEngine();

const checkWinner = () => {
    engine.checkVerticals();
    engine.checkHorizontals();
    engine.checkDiagonals();
    console.log("working");
}

const gameBoard = () => {

    const changeScreen = () => {
        displayMenu = !displayMenu;
        if (displayMenu) {
            ticC.style.display = "none";
            gameC.style.display = "none";
            mainC.style.display = "grid";
        }
        else {
            ticC.style.display = "grid";
            gameC.style.display = "grid";
            mainC.style.display = "none";
        }

    }

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
                const determinePlay = () => {

                    //set initial value for which move to make to nonexistant cell 
                    //and a boolean for ourTurn to false
                    let move = -1;
                    let score = -2;
                    let ourTurn = false;
                    let testBoardState = boardStateArray;

                    //set ourTurn = !ourTurn
                    //test each available move with a copied board, 
                    //assigning a +1 value to any winning move if our turn, -1 if opp

                    const recursiveAI = (boardState) => {

                    ourTurn = !ourTurn;
                    for (i = 0; i < 9; i++) {
                        if (boardState[i] == 0) {

                        }

                    }
                    //call this function again with the new boardstate

                    //if winning move found, return this move


                    //if no moves are available, return 0
                    }

                }

            break;
            case "human":

            break;
        }
    }

    

    //function to add XO to grid, change active player, assign graphic
    const addMark = (e) => {
        if(e.className == "cell gameSquare") {
                e.className = "cell clicked";
                e.innerText = playerOnesTurn == true ? "X" : "O";
                boardStateArray[e.getAttribute('id')-1] = playerOnesTurn == true ? 1 : -1;
                playerOnesTurn = playerOnesTurn == true ? false : true;
                //should now call appropriate AI function to fill next square or pass turn
                //to the other human player
                if (playerOnesTurn == false) {addMark(aiMove())};
            }
    }

    const addMarkHandler = (e) => {
        let domE = e.target;
        console.log(domE);
        addMark(domE);
    }

    return {addMark, aiMove, countOpenSquares, addMarkHandler, changeScreen};    

};




const players = () => {



};



let board = gameBoard();

body.addEventListener('click', board.addMarkHandler);
body.addEventListener('click', checkWinner);
play.addEventListener('click', board.changeScreen);
mainMenu.addEventListener('click', board.changeScreen);