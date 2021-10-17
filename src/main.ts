import { Board } from "./board";

enum State {
  Empty,
  Snake,
  Food,
}

const colorMap = new Map([
  [State.Empty, null], // null hides the cell.
  [State.Snake, "#000"],
  [State.Food, "#C00"],
]);

function main() {
  const board = new Board(20, colorMap);

  setInterval(() => {
    const newState = [];

    for (let x = 0; x < 400; x++) {
      const n = Math.floor(Math.random() * 3);
      newState.push(n);
    }

    board.update(newState);
  }, 1000);
}

window.onload = main;
