if(document.readyState == "loading") //Checks and makes sure that the document it loaded before we access the different parts of it
{
    document.addEventListener("DOMContentLoaded", ready)
}
else{
    ready()
}
var activePlayer = 'X';
var playerXScore = 0
var playerOScore = 0
const board = ['1', '2', '3', '4', '5', '6', '7', '8', '9', ]
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
 ];
 var Xpos = new Array()
 var Opos = new Array()
function ready()
{
    let item = document.getElementsByClassName("grid-item")
    for(var i = 0; i< item.length; i++)
    {
        var button = item[i]
        button.addEventListener("click", addTurn)
    }
}

function addTurn(event)
{
    console.log(event)
    let item = event.srcElement
    console.log(activePlayer)
    item.innerText = activePlayer
    activePlayer = Swap()
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