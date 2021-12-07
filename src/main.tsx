import { times } from "lodash";
import ReactDOM from "react-dom";
import { Game } from "./game";
import { Team } from "./enum";
import { Layout } from "./UI/Layout";

const game = new Game();

const playerShip = game.shipFactory.create({
  x: 0,
  y: 0,
  yaw: 0,
  shipName: "Blue",
  team: Team.Player,
});

playerShip.components.Player = { kind: "Player" };
// playerShip.components.Offensive!.target = 1;

const TEST_RANGE = 1500;
const TEST_COUNT = 3;
times(TEST_COUNT, () => {
  const ship = game.shipFactory.create({
    x: Math.random() * TEST_RANGE - TEST_RANGE / 2,
    y: Math.random() * TEST_RANGE - TEST_RANGE / 2,
    yaw: 0,
    shipName: "Red",
    runAi: true,
    team: Team.Independent,
  });

  ship.components.Offensive!.target = 0;
});

game.start();

declare global {
  interface Window {
    _game: Game;
  }
}

window._game = game;

/**
 * UI.
 */
function render() {
  ReactDOM.render(<Layout game={game} />, document.getElementById("ui"));
  requestAnimationFrame(render);
}

render();
