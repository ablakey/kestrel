import { Engine, GameState, KeyState } from "./engine";

const WIDTH = 20;
const HEIGHT = 20;

enum Cell {
  Empty,
  Snake,
  Food,
}

const COLOR_MAP = new Map([
  [Cell.Empty, null], // null hides the cell.
  [Cell.Snake, "#000"],
  [Cell.Food, "#C00"],
]);

const INITIAL_GAME_STATE: GameState = {
  board: new Array(HEIGHT).fill(0).map(() => new Array(WIDTH).fill(Cell.Empty)),
};

const INPUT_KEYS = ["uparrow"];

function updateSnake(deltaTime: number, gameState: GameState, keyState: KeyState) {
  // Do something.
  // TODO: need to make the System interface a class. Otherwise it cannot hold its own state and things get weird.
  // TODO: or do we? Do we want to hold system state on gameState maybe.
}

function updateInput() {
  // TODO:
}

function main() {
  const engine = new Engine({
    width: WIDTH,
    height: HEIGHT,
    systems: [updateInput, updateSnake],
    colorMap: COLOR_MAP,
    initialGameState: INITIAL_GAME_STATE,
    inputKeys: INPUT_KEYS,
  });

  // setInterval(() => {
  //   const newState = new Array(20).fill(0).map(() => new Array(20).fill(0));

  //   for (let y = 0; y < 20; y++) {
  //     for (let x = 0; x < 20; x++) {
  //       const n = Math.floor(Math.random() * 3);
  //       newState[x][y] = n;
  //     }
  //   }

  //   board.update(newState);
  // }, 1000);
}

window.onload = main;
