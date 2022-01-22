import ReactDOM from "react-dom";
import Victor from "victor";
import { ZIndexes } from "./config";
import { Game } from "./game";
import { Layout } from "./UI/Layout";

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
    team: "Player",
  });

  /**
   * Player ship is a veery special case so we do weird stuff here to get it, make it the player ship, and scrub
   * AI from it.
   */
  const playerShip = game.entities.getPlayer();
  playerShip.components.sprite.zIndex = ZIndexes.Player;

  game.planetFactory.create(new Victor(0, 0), "Levo");

  /**
   * Enemy ship
   */
  game.shipFactory.create({
    shipName: "Red",
    team: "Rebellion",
    position: new Victor(Math.random() * 1500 - 250, Math.random() * 1500 - 1250),
    yaw: Math.random() * Math.PI,
  });

  /**
   * Neutral ship
   */
  game.shipFactory.create({
    shipName: "Blue",
    team: "Independent",
    position: new Victor(Math.random() * 1500 - 250, Math.random() * 1500 - 1250),
    yaw: Math.random() * Math.PI,
  });

  game.start();

  window._game = game;

  function render() {
    ReactDOM.render(<Layout game={game} />, document.getElementById("ui"));
    requestAnimationFrame(render);
  }

  render();
}

main();
