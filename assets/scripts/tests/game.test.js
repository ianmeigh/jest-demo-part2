/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore } = require("../game");

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
  test("Should clear the currentGame (computer sequence) Array", () => {
    expect(game.currentGame.length).toBe(0);
  });
  test("Should clear the playerMoves Array", () => {
    expect(game.playerMoves).toEqual([]);
  });
  test("Should display 0 for the element with the id of 'score", () => {
    expect(document.getElementById("score").innerText).toEqual(0);
  });
});
