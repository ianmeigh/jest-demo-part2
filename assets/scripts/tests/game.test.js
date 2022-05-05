/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, lightsOn } = require("../game");

beforeAll(() => {
  let fs = require("fs");
  const fileContents = fs.readFileSync("index.html", "utf-8");
  document.documentElement.innerHTML = fileContents.toString();
});

describe("game object contains the correct keys", () => {
  test("score key exists", () => {
    expect("score" in game).toBe(true);
  });
  test("currentGame key exists", () => {
    expect("currentGame" in game).toBe(true);
  });
  test("currentGame key contains Array", () => {
    expect(Array.isArray(game.currentGame)).toBe(true);
  });
  test("playerMoves key exists", () => {
    expect("playerMoves" in game).toBe(true);
  });
  test("choices key exists", () => {
    expect("choices" in game).toBe(true);
  });
  test("choices key contains Array", () => {
    expect(Array.isArray(game.choices)).toBe(true);
  });
  test("choices contains the correct ids", () => {
    expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
  });
});

describe("newGame works correctly", () => {
  beforeAll(() => {
    game.score = 1;
    game.currentGame = [2, 3];
    game.playerMoves = [3, 4];
    document.getElementById("score").innerText = "42";
    newGame();
  });
  test("Should set the game score to 0", () => {
    expect(game.score).toEqual(0);
  });
  test("Should be 1 element in the currentGame (computers sequence) Array", () => {
    expect(game.currentGame.length).toEqual(1);
  });
  test("Should clear the playerMoves Array", () => {
    expect(game.playerMoves).toEqual([]);
  });
  test("Should display 0 for the element with the id of 'score", () => {
    expect(document.getElementById("score").innerText).toEqual(0);
  });
});

describe("Gameplay works correctly", () => {
  beforeEach(() => {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    addTurn();
  });
  afterEach(() => {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
  });
  test("addTurn adds a new turn to the game", () => {
    addTurn();
    expect(game.currentGame.length).toBe(2);
  });
  test("Should add correct class to light up the buttons", () =>{
    let button = document.getElementById(game.currentGame[0]);
    lightsOn(game.currentGame[0]);
    expect(button.classList).toContain('light');
  });
});
