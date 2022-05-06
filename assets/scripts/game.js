let game = {
  "score": 0,
  "currentGame": [],
  "playerMoves": [],
  "turnNumber": 0,
  "choices": ["button1", "button2", "button3", "button4"],
};

function newGame() {
  game.score = 0;
  game.currentGame = [];
  game.playerMoves = [];
  game.turnNumber = 0;
  document.querySelectorAll(".circle").forEach(element => {
    if (element.getAttribute("data-listener") !== "true") {
      element.addEventListener("click", (e) => {
        let move = e.target.getAttribute("id");
        lightsOn(move);
        game.playerMoves.push(move);
        playerTurn();
      });
      element.setAttribute("data-listener", "true");
    }
  });
  showScore();
  addTurn();
}

const showScore = () => document.getElementById("score").innerText = game.score;

const addTurn = () => {
  game.playerMoves = [];
  game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
  showTurns();
};

const lightsOn = (circ) => {
  document.getElementById(circ).classList.add("light");
  setTimeout(() => {
    document.getElementById(circ).classList.remove("light");
  }, 400);
};

const showTurns = () => {
  game.turnNumber = 0;
  let turns = setInterval(() => {
    lightsOn(game.currentGame[game.turnNumber]);
    game.turnNumber++;
    if (game.turnNumber >= game.currentGame.length) {
      clearInterval(turns);
    }
  }, 800);
};

function playerTurn() {

  /* Checks after each move has been entered */

  let i = game.playerMoves.length - 1;
  if (game.currentGame[i] === game.playerMoves[i]) {
    if (game.currentGame.length == game.playerMoves.length) {
      game.score++;
      showScore();
      addTurn();
    }
  } else {
    window.alert("Wrong Move!");
    newGame();
  }

  /* Checks after all moves have been entered */

  // if (game.currentGame.length == game.playerMoves.length) {
  //   if (game.currentGame.every((value, index) => value === game.playerMoves[index])) {
  //     console.log("correct");
  //     game.score++;
  //     showScore();
  //     addTurn();
  //   } else {
  //     console.log("incorrect");
  //     window.alert("Wrong Move!");
  //   }
  // }
}

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };
