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
  const button = document.getElementById(circ);
  button.classList.add("light");
  setTimeout(() => {
    button.classList.remove("light");
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
  if (game.currentGame.length == game.playerMoves.length) {
    if (game.currentGame.every((value, index) => value === game.playerMoves[index])) {
      console.log("correct");
      game.score++;
      showScore();
      addTurn();
    } else {
      console.log("incorrect");
    }
  }
}

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };
