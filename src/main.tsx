import ReactDOM from "react-dom";
import Victor from "victor";
import { ZIndexes } from "./config";
import { Team } from "./enum";
import { ShipEntity } from "./Factories/ShipFactory";
import { Game } from "./game";
import { Layout } from "./UI/Layout";
import { assert, pickRandom } from "./utils";

declare global {
  interface Window {
    _game: Game;
  }
}

async function main() {
  const game = await Game.init();
  game.shipFactory.create({
    position: new Victor(500, -500),
    yaw: 0,
    shipName: "Blue",
    team: Team.Player,
  });

  /**
   * Player ship is a veery special case so we do weird stuff here to get it, make it the player ship, and scrub
   * AI from it.
   */
  const playerShip = game.entities.find((e) => e.components.politics?.team === Team.Player) as
    | ShipEntity
    | undefined;
  assert(playerShip, "Player Ship was not found.");
  playerShip.components.sprite.zIndex = ZIndexes.Player;
  playerShip.components.player = { kind: "Player" };
  delete (playerShip.components as any).ai;

  game.planetFactory.create(new Victor(0, 0), "Levo");

  const DEBUG_SHIP_COUNT = 1;

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
