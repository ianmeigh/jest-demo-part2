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
}

const showScore = () => document.getElementById("score").innerText = 0;

module.exports = { game, newGame, showScore };