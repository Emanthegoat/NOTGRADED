 const takenPlaces = ['1', '2']
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
const board = ['1', '2', '3', '4', '5', '6', '7', '8', '9', ];
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

// takenPlaces = Response.data
// console.log(takenPlaces)
 
function ready()
{
    let check = "false"
    let item = document.getElementsByClassName("grid-item");
    for(var i = 0; i < item.length; i++)
    {
        var button = item[i];
        let itemPlace = Number(item[i].getAttribute('name'));
        console.log(checkPlace(1));
        if(check == 'false')
        {
            console.log("adasdas")
            button.addEventListener("click", addTurn);
        }
        else if(check == 'true')
        {
            console.log("99999")
            button.removeEventListener("click", addTurn);
        }
    }
}
checkPlace(2);
function checkPlace(x)
{
    let i = 0
    var result = "sdgds"
    console.log(takenPlaces.length)
    return result;
}
function addTurn(x)
{
    console.log(x)
    pos(x)
    let item = x.srcElement
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
function pos(x)
{
    if(activePlayer == "X")
    {
        let item = x.srcElement
        Xpos.push(item.getAttribute("name"))
        takenPlaces.push(item.getAttribute("name"))
    }
    else if(activePlayer == "O")
    {
        let item = x.srcElement
        Opos.push(item.getAttribute("name"))
        takenPlaces.push(item.getAttribute("name"))
    }
}








// test.sort(function(a, b){return a-b});