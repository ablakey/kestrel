import ReactDOM from "react-dom";
import { Team } from "./enum";
import { Game } from "./game";
import { Layout } from "./UI/Layout";

const game = new Game();

const playerShip = game.shipFactory.create({
  x: 0,
  y: 0,
  yaw: 0,
  shipName: "Blue",
  team: Team.Player,
});

playerShip.components.player = { kind: "Player" };

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
