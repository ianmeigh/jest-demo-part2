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
  showScore();
  addTurn();
}

const showScore = () => document.getElementById("score").innerText = 0;

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

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns };