import ReactDOM from "react-dom";
import Victor from "victor";
import { Team } from "./enum";
import { Game } from "./game";
import { Layout } from "./UI/Layout";

declare global {
  interface Window {
    _game: Game;
  }
}

async function main() {
  const game = await Game.init();
  const playerShip = game.shipFactory.create({
    position: new Victor(0, 0),
    yaw: 0,
    shipName: "Blue",
    team: Team.Player,
  });

  playerShip.components.player = { kind: "Player" };
  delete (playerShip.components as any).ai;

  game.start();

  window._game = game;

  function render() {
    ReactDOM.render(<Layout game={game} />, document.getElementById("ui"));
    requestAnimationFrame(render);
  }

  render();
}

main();
