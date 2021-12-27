import ReactDOM from "react-dom";
import Victor from "victor";
import { ZIndexes } from "./config";
import { Team } from "./enum";
import { Game } from "./game";
import { Layout } from "./UI/Layout";
import { pickRandom } from "./utils";

declare global {
  interface Window {
    _game: Game;
  }
}

async function main() {
  const game = await Game.init();
  const playerShip = game.shipFactory.create({
    position: new Victor(500, -500),
    yaw: 0,
    shipName: "Blue",
    team: Team.Player,
  });

  playerShip.components.sprite.zIndex = ZIndexes.Player;
  playerShip.components.player = { kind: "Player" };
  delete (playerShip.components as any).ai;

  game.doodadFactory.spawnPlanet(new Victor(0, 0), "Levo");

  const DEBUG_SHIP_COUNT = 0;

  for (let x = 0; x < DEBUG_SHIP_COUNT; x++) {
    game.shipFactory.create({
      shipName: "Red",
      team: pickRandom([Team.Rebellion, Team.Confederacy]),
      position: new Victor(Math.random() * 1500 - 250, Math.random() * 1500 - 1250),
      yaw: Math.random() * Math.PI,
    });
  }

  game.start();

  window._game = game;

  function render() {
    ReactDOM.render(<Layout game={game} />, document.getElementById("ui"));
    requestAnimationFrame(render);
  }

  render();
}

main();
