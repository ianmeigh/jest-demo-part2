/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game");

jest.spyOn(window, "alert").mockImplementation(() => { });

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
  test("turnNumber key exists", () => {
    expect("turnNumber" in game).toBe(true);
  });
  test("turnInProgress key exists", () => {
    expect("turnInProgress" in game).toBe(true);
  });
  test("turnInProgress key is false", () => {
    expect(game.turnInProgress).toBeFalsy();
  });
  test("turnInProgress key is boolean", () => {
    expect(typeof (game.turnInProgress)).toBe("boolean");
  });
  test("lastButton key exists", () => {
    expect("lastButton" in game).toBe(true);
  });
  test("lastButton key is empty String", () => {
    expect(game.lastButton).toBe("");
  });
});

describe("newGame works correctly", () => {
  beforeAll(() => {
    game.score = 1;
    game.currentGame = [2, 3];
    game.playerMoves = [3, 4];
    game.turnNumber = 1;
    game.lastButton = "button1";
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
  test("Should set the turnNumber to 0", () => {
    expect(game.turnNumber).toEqual(0);
  });
  test("Should set the lastButton to an empty String ('')", () => {
    expect(game.lastButton).toEqual("");
  });
  test("Should display 0 for the element with the id of 'score", () => {
    expect(document.getElementById("score").innerText).toEqual(0);
  });
  test("Expect data-listener to be true", () => {
    document.querySelectorAll(".circle").forEach(element => {
      expect(element.getAttribute("data-listener")).toEqual("true");
    });
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
  test("Should add correct class to light up the buttons", () => {
    let button = document.getElementById(game.currentGame[0]);
    lightsOn(game.currentGame[0]);
    expect(button.classList).toContain('light');
  });
  test("showTurns should update game.turnNumber", () => {
    game.turnNumber = 1;
    showTurns();
    expect(game.turnNumber).toBe(0);
  });
  test("Score should increment if the 1st turn is correct", () => {
    game.playerMoves.push(game.currentGame[0]);
    playerTurn();
    expect(game.score).toBe(1);
  });
  test("Score should increment if the 1st and 2nd turns are correct", () => {
    game.playerMoves.push(game.currentGame[0]);
    playerTurn();
    game.playerMoves.push(game.currentGame[0], game.currentGame[1]);
    playerTurn();
    expect(game.score).toBe(2);
  });
  test("Element with the id of 'score' should show 1 if first turn is correct", () => {
    game.playerMoves.push(game.currentGame[0]);
    playerTurn();
    expect(document.getElementById("score").innerText).toEqual(1);
  });
  test("Should call an alert if the players moves are incorrect, do not match", () => {
    game.playerMoves.push("wrong answer");
    playerTurn();
    expect(window.alert).toBeCalledWith("Wrong Move!");
  });
  test("turnInProgress should be 'true' when not players turn", () => {
    showTurns();
    expect(game.turnInProgress).toBe(true);
  });
  test("clicking buttons during the computers turn should fail", () => {
    showTurns();
    game.lastButton = "";
    document.getElementById("button1").click();
    expect(game.lastButton).toEqual("");
  });
});
