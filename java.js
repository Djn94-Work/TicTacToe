//global vars
let moves = 0;
let targetSquare;
let xWins = 0;
let oWins = 0;
let ties = 0;
//square vars

const topLeftsq = document.getElementById("topLeft");
const topsq = document.getElementById("topMid");
const topRightsq = document.getElementById("topRight");
const leftsq = document.getElementById("left");
const middlesq = document.getElementById("middle");
const rightsq = document.getElementById("right");
const bottomLeftsq = document.getElementById("bottomLeft");
const bottomsq = document.getElementById("bottom");
const bottomRightsq = document.getElementById("bottomRight");

//player constructor
class Player {
  constructor(isTurn, name) {
    this.isTurn = isTurn;
    this.name = name;
  }
}
//player objects
const playerOne = new Player(true, "x");
const playerTwo = new Player(false, "o");

// Grabs squares, loops through squares, sets unplayed to true
function clickEvent() {
  const elements = document.getElementsByClassName("squares");
  for (i = 0; i < elements.length; i++) {
    elements[i].setAttribute("unplayed", true);
    elements[i].innerText = "?";
  }
}
function winModal() {
  console.log(targetSquare);
  if (targetSquare.getAttribute("xplayed") === "true") {
    console.log("x win tree");
    document.getElementById("winText").innerHTML =
      "Player X has won! Congratulations! <button id='reset'>Restart?</button>";
    document.getElementById("reset").onclick = function() {
      clearBoard();
    };
    xWins++;
    document.getElementById("xwins").innerText = `Player X Wins: ${xWins}`;
    resModal.style.display = "block";
  }
  if (targetSquare.getAttribute("oplayed") === "true") {
    console.log("o win tree");
    document.getElementById("winText").innerHTML =
      "Player O has won! Congratulations! <button id='reset'>Restart?</button>";
    document.getElementById("reset").onclick = function() {
      clearBoard();
    };
    oWins++;
    document.getElementById("owins").innerText = `Player O Wins: ${oWins}`;
    resModal.style.display = "block";
  }
}
//Searches for all X or all O matches, displays tie at 9 moves
function checkForWin() {
  if (moves >= 4) {
    if (
      (topLeft.getAttribute("xplayed") === "true" &&
        left.getAttribute("xplayed") === "true" &&
        bottomLeft.getAttribute("xplayed") === "true") ||
      (topLeft.getAttribute("oplayed") === "true" &&
        left.getAttribute("oplayed") === "true" &&
        bottomLeft.getAttribute("oplayed") === "true")
    ) {
      winModal();
    }
    if (
      (topMid.getAttribute("xplayed") === "true" &&
        middle.getAttribute("xplayed") === "true" &&
        bottom.getAttribute("xplayed") === "true") ||
      (topMid.getAttribute("oplayed") === "true" &&
        middle.getAttribute("oplayed") === "true" &&
        bottom.getAttribute("oplayed") === "true")
    ) {
      winModal();
    }
    if (
      (topRight.getAttribute("xplayed") === "true" &&
        right.getAttribute("xplayed") === "true" &&
        bottomRight.getAttribute("xplayed") === "true") ||
      (topRight.getAttribute("oplayed") === "true" &&
        right.getAttribute("oplayed") === "true" &&
        bottomRight.getAttribute("oplayed") === "true")
    ) {
      winModal();
    }
    if (
      (topRight.getAttribute("xplayed") === "true" &&
        topMid.getAttribute("xplayed") === "true" &&
        topLeft.getAttribute("xplayed") === "true") ||
      (topRight.getAttribute("oplayed") === "true" &&
        topMid.getAttribute("oplayed") === "true" &&
        topLeft.getAttribute("oplayed") === "true")
    ) {
      winModal();
    }
    if (
      (left.getAttribute("xplayed") === "true" &&
        middle.getAttribute("xplayed") === "true" &&
        right.getAttribute("xplayed") === "true") ||
      (left.getAttribute("oplayed") === "true" &&
        middle.getAttribute("oplayed") === "true" &&
        right.getAttribute("oplayed") === "true")
    ) {
      winModal();
    }
    if (
      (bottomLeft.getAttribute("xplayed") === "true" &&
        bottom.getAttribute("xplayed") === "true" &&
        bottomRight.getAttribute("xplayed") === "true") ||
      (bottomLeft.getAttribute("oplayed") === "true" &&
        bottom.getAttribute("oplayed") === "true" &&
        bottomRight.getAttribute("oplayed") === "true")
    ) {
      winModal();
    }
    if (
      (topRight.getAttribute("xplayed") === "true" &&
        middle.getAttribute("xplayed") === "true" &&
        bottomLeft.getAttribute("xplayed") === "true") ||
      (topRight.getAttribute("oplayed") === "true" &&
        middle.getAttribute("oplayed") === "true" &&
        bottomLeft.getAttribute("oplayed") === "true")
    ) {
      winModal();
    }
    if (
      (topLeft.getAttribute("xplayed") === "true" &&
        middle.getAttribute("xplayed") === "true" &&
        bottomRight.getAttribute("xplayed") === "true") ||
      (topLeft.getAttribute("oplayed") === "true" &&
        middle.getAttribute("oplayed") === "true" &&
        bottomRight.getAttribute("oplayed") === "true")
    ) {
      winModal();
    } else if (moves === 8) {
      tieModal.style.display = "block";
      ties++;
      document.getElementById("ties").innerText = `Ties: ${ties}`;
    }
  }
}

function clearBoard() {
  moves = 0;
  document.getElementById("moves").innerText = `Moves: ${moves}`;
  const elements = document.getElementsByClassName("squares");
  for (i = 0; i < elements.length; i++) {
    elements[i].setAttribute("unplayed", true);
    elements[i].setAttribute("xplayed", false);
    elements[i].setAttribute("oplayed", false);
    elements[i].innerText = "?";
    resModal.style.display = "none";
    tieModal.style.display = "none";
  }
}

document.getElementById("reset2").onclick = function() {
  clearBoard();
};
//starts on load, sets player one turn to true,
function game() {
  playerOne.isTurn = true;
  playerTwo.isTurn = false;
  clickEvent();
  document.getElementById("xwins").innerText = `Player X Wins: ${xWins}`;
  document.getElementById("owins").innerText = `Player O Wins: ${oWins}`;
  document.getElementById("ties").innerText = `Ties: ${ties}`;
  document.getElementById(
    "currentTurn"
  ).innerText = `Current player: ${playerOne.name}`;
  document.onclick = function(target) {
    targetSquare = document.getElementById(target.path[0].id);
    if (targetSquare.getAttribute("unplayed") == "true") {
      if (playerOne.isTurn) {
        playerOne.isTurn = false;
        playerTwo.isTurn = true;
        targetSquare.innerText = "x";
        targetSquare.setAttribute("unplayed", false);
        targetSquare.setAttribute("Xplayed", true);
        checkForWin();
        moves++;
        document.getElementById("moves").innerText = `Moves: ${moves}`;
        document.getElementById(
          "currentTurn"
        ).innerText = `Current player: ${playerTwo.name}`;
      } else {
        playerTwo.isTurn = false;
        playerOne.isTurn = true;
        targetSquare.innerText = "0";
        targetSquare.setAttribute("unplayed", false);
        targetSquare.setAttribute("Oplayed", true);
        checkForWin();
        moves++;
        document.getElementById("moves").innerText = `Moves: ${moves}`;
        document.getElementById(
          "currentTurn"
        ).innerText = `Current player: ${playerOne.name}`;
      }
    }
  };
}

document.onload = game();

const resModal = document.getElementById("resModal");
const tieModal = document.getElementById("tieModal");
const span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  resModal.style.display = "none";
  tieModal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == resModal) {
    resModal.style.display = "none";
  }
  if (event.target == tieModal) {
    tieModal.style.display = "none";
  }
};
