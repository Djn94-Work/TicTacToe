//global vars
let moves = 0;
let targetSquare;
let xWins = 0;
let oWins = 0;
let ties = 0;

//modal vars
const resModal = $("#resModal")[0];
const tieModal = $("#tieModal")[0];
const span = $(".close")[0];

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
  const elements = $(".squares");
  for (i = 0; i < elements.length; i++) {
    elements[i].setAttribute("unplayed", true);
    elements[i].innerText = "?";
  }
}

//Opens win modal
function winModal() {
  console.log(targetSquare);
  if (targetSquare.getAttribute("xplayed") === "true") {
    console.log("x win tree");
    $("#winText")[0].innerHTML =
      "Player X has won! Congratulations! <button id='reset'>Restart?</button>";
    $("#reset")[0].onclick = function() {
      clearBoard();
    };
    xWins++;
    $("#xwins")[0].innerText = `Player X Wins: ${xWins}`;
    resModal.style.display = "block";
  }
  if (targetSquare.getAttribute("oplayed") === "true") {
    console.log("o win tree");
    $("#winText")[0].innerHTML =
      "Player O has won! Congratulations! <button id='reset'>Restart?</button>";
    $("#reset")[0].onclick = function() {
      clearBoard();
    };
    oWins++;
    $("#owins")[0].innerText = `Player O Wins: ${oWins}`;
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
      $("#ties")[0].innerText = `Ties: ${ties}`;
    }
  }
}

//whipe board, reset attributes
function clearBoard() {
  moves = 0;
  $("#moves")[0].innerText = `Moves: ${moves}`;
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

//Reset button onclick
$("#reset2")[0].onclick = function() {
  clearBoard();
};

//Hide modal on close button
span.onclick = function() {
  resModal.style.display = "none";
  tieModal.style.display = "none";
};

//hide modal on window click
window.onclick = function(event) {
  if (event.target == resModal) {
    resModal.style.display = "none";
  }
  if (event.target == tieModal) {
    tieModal.style.display = "none";
  }
};

//starts on load, sets player one turn to true,
function game() {
  playerOne.isTurn = true;
  playerTwo.isTurn = false;
  clickEvent();
  $("#xwins")[0].innerText = `Player X Wins: ${xWins}`;
  $("#owins")[0].innerText = `Player O Wins: ${oWins}`;
  $("#ties")[0].innerText = `Ties: ${ties}`;
  $("#currentTurn").innerText = `Current player: ${playerOne.name}`;
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
        $("#moves")[0].innerText = `Moves: ${moves}`;
        $("#currentTurn")[0].innerText = `Current player: ${playerTwo.name}`;
      } else {
        playerTwo.isTurn = false;
        playerOne.isTurn = true;
        targetSquare.innerText = "0";
        targetSquare.setAttribute("unplayed", false);
        targetSquare.setAttribute("Oplayed", true);
        checkForWin();
        moves++;
        $("#moves")[0].innerText = `Moves: ${moves}`;
        $("#currentTurn")[0].innerText = `Current player: ${playerOne.name}`;
      }
    }
  };
}

document.onload = game();
