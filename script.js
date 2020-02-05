let body = document.querySelector('body');
let playerOnesTurn = true;
let boardStateArray = [0,0,0,0,0,0,0,0,0];

const gameBoard = () => {


    //function to add XO to grid, change active player, assign graphic
    const addMark = (e) => {
        console.log(e.target.className);
        if(e.target.className == "gameSquare") {
                e.target.className = "clicked";
                e.target.innerText = playerOnesTurn == true ? "X" : "O";
                boardStateArray[e.target.getAttribute('id')-1] = playerOnesTurn == true ? 1 : -1;
                playerOnesTurn = playerOnesTurn == true ? false : true;
                console.log(e.target.getAttribute('id'));
                console.log(boardStateArray);
            }
    }
    return {addMark};

    

};




const players = () => {



};

const gameEngine = () => {
    let winner = "";

    //check horizonals
    const checkHorizontals = (arr) => {
        let result = 0;

        for (i = 1; i < boardStateArray.length+1; i++) {
            result += boardStateArray[i-1];
            if (result == 3) { winner = "Player One" };
            if (result == -3) { winner = "Player Two" };
            if (i % 3 === 0) {result = 0};
        }
        console.log(winner);
    }
    //check verticals
    const checkVerticals = (arr) => {
   
    for (j = 1; j < 4; j++) {
        let result = 0;
        for (i = j; i < boardStateArray.length+1; i=i+3) {
            result += boardStateArray[i-1];
            if (result == 3) { winner = "Player One" };
            if (result == -3) { winner = "Player Two" };
        }
    }
    console.log(winner);
}
    //check diagonals
    const checkDiagonals = (arr) => {
        let diagOne = boardStateArray[0] + boardStateArray[4] + boardStateArray[8];
        let diagTwo = boardStateArray[2] + boardStateArray[4] + boardStateArray[6];
        console.log("diagOne is" +diagOne);
        console.log("diagTwo is " +diagTwo);
        if (diagOne == 3 || diagTwo == 3) { winner = "Player One" };
        if (diagOne == -3 || diagTwo == -3) { winner = "Player Two" };
        console.log(winner);
    }

    return {checkHorizontals, checkVerticals, checkDiagonals};
};

let board = gameBoard();
let engine = gameEngine();
body.addEventListener('click', board.addMark);
body.addEventListener('click', engine.checkHorizontals);
body.addEventListener('click', engine.checkVerticals);
body.addEventListener('click', engine.checkDiagonals);