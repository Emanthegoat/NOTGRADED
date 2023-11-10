const takenPlaces = new Array()
var gameOver = false;
 if(document.readyState == "loading") //Checks and makes sure that the document it loaded before we access the different parts of it
{
    document.addEventListener("DOMContentLoaded", ready)
}
else{
    ready()
}
var activePlayer = 'X';
var prevWinner = "O"
var playerXScore = 0
var playerOScore = 0
var TieCounter = 0
const board = ['1', '2', '3', '4', '5', '6', '7', '8', '9', ];
const winningConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
 ];
 var Xpos = new Array()
 var Opos = new Array()
 
function ready() {
    const items = document.getElementsByClassName("grid-item");
    for (let i = 0; i < items.length; i++) {
        const button = items[i];
        button.addEventListener("click", handleGridItemClick);
    }
    const resetBtn = document.getElementsByClassName("reset")[0]
    resetBtn.addEventListener('click' , reset)
}

function handleGridItemClick(event) 
{
    if (!gameOver) {
        const itemPlace = parseInt(event.target.getAttribute('name'));
        if (!checkPlace(itemPlace)) {
            addTurn(event);
        } else {
            // Handle the case where the position is already taken
            alert("Position already taken!");
        }
    } 
    if(gameOver === true) {
        // Game is over, further moves are disabled
        alert("Game over. Please reset the game.");
    }
}

function checkPlace(position) {
    return takenPlaces.includes(String(position)); // Check if the position is already taken
}

function addTurn(x)
{
    prevWinner = activePlayer;
    let item = x.srcElement
    item.innerText = activePlayer
    setTimeout(() => {if (activePlayer === 'X') 
    {
        pos(x, 'X')
        if (checkWin(Xpos)) {
            // Player X wins
            alert("Player X wins!");
            //update the score here
            playerXScore +=1
            let appendScorePos = document.getElementsByClassName("player1Score")[0]
            let p = appendScorePos.getElementsByTagName("p")[0]
            p.innerText = playerXScore
        } 
        else if (checkTie()) 
        {
            // Game ends in a tie
            alert("It's a tie!");
            TieCounter += 1
            let appendScorePos = document.getElementsByClassName("TieCounter")[0]
            let p = appendScorePos.getElementsByTagName("p")[0]
            p.innerText = TieCounter
        }
    } 
    else if (activePlayer === 'O') 
    {
        pos(x, 'O')
        if (checkWin(Opos)) {
            // Player O wins
            alert("Player O wins!");
            //update the score here
            playerOScore +=1
            let appendScorePos = document.getElementsByClassName("player2Score")[0]
            let p = appendScorePos.getElementsByTagName("p")[0]
            p.innerText = playerOScore
        } else if (checkTie()) {
            // Game ends in a tie
            alert("It's a tie!");
            TieCounter += 1
            let appendScorePos = document.getElementsByClassName("TieCounter")[0]
            let p = appendScorePos.getElementsByTagName("p")[0]
            p.innerText = TieCounter
             
        }
    }
    if (checkWin(Xpos) || checkWin(Opos) || checkTie()) {
        // Player wins or tie, disable further moves
        // removeClickEvents();
        gameOver = true;
    }}, 100);
    setTimeout(() => {activePlayer = Swap()
        let activePlayerText = document.getElementsByClassName("activePlayer")[0]
        let letter = activePlayerText.getElementsByTagName('h5')[0]
        letter.innerText = activePlayer;}, 100);
}

function Swap()
{
    if(activePlayer == "X")
    {
        return 'O';
    }
    else if(activePlayer == "O")
    {
        return 'X';
    }
}
function pos(x, y) {
    console.log('Active Player:', activePlayer);
    let item = x.srcElement;
    const position = item.getAttribute("name");
    takenPlaces.push(position); // Push to the general takenPlaces array
    if (activePlayer === "X") {
        Xpos.push(position); // Push to Xpos if the active player is X
    }

    if (activePlayer === "O") 
    {
        Opos.push(position); // Push to Opos if the active player is O
    }
}
function checkWin(playerPositions) {
    let prevWinPos = new Array()
    return winningConditions.some(condition => {
        if (condition.every(pos => playerPositions.includes(pos.toString()))) {
            prevWinPos = condition.slice(); // Copy the winning condition to prevWinPos
            console.log(prevWinPos)
            updateWinningStyles(prevWinPos)
            return true; // Return true to indicate a win
        }
        console.log("dasdas")
        return false;
    });

    return prevWinPos;
    
}

function updateWinningStyles(prevWinPos) {
    const gridItems = document.getElementsByClassName("grid-item");

    for (let i = 0; i < gridItems.length; i++) {
        const item = gridItems[i];
        const itemName = item.getAttribute("name");

        if (prevWinPos.includes(Number(itemName))) {
            item.classList.add("winning-item"); // Add a class for winning items
        } else {
            item.classList.remove("winning-item"); // Remove the class for non-winning items
        }
    }
}


function checkTie() {
    return takenPlaces.length === 9; // If all positions are taken and there's no winner
}

function reset()
{
     // Clear the board - reset all the necessary variables and elements
     takenPlaces.length = 0;
     Xpos.length = 0;
     Opos.length = 0;
 
     const gridItems = document.getElementsByClassName("grid-item");
     for (let i = 0; i < gridItems.length; i++) {
         gridItems[i].innerText = ''; // Clear the marks on the board
         gridItems[i].classList.remove("winning-item")
     }
     
     // Reset activePlayer to the prevWinner
     activePlayer = prevWinner;
     gameOver = false;
}