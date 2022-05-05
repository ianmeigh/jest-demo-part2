let game = {
  "score": 0,
  "currentGame": [],
  "playerMoves": [],
  "choices": ["button1", "button2", "button3", "button4"],
};

function newGame() {
  game.score = 0;
  game.currentGame = [];
  game.playerMoves = [];
  showScore();
  addTurn();
}

const showScore = () => document.getElementById("score").innerText = 0;

const addTurn = () => {
  game.playerMoves = [];
  game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
  // showTurns();
};

const lightsOn = (circ) => {
  const button = document.getElementById(circ);
  button.classList.add("light");
  setTimeout(() => {
    button.classList.remove("light");
  }, 400);
};

module.exports = { game, newGame, showScore, addTurn, lightsOn };