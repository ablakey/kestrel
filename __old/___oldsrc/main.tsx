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
    position: new Victor(0, 0),
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

  // game.planetFactory.create(new Victor(0, 0), "Levo");

  /**
   * Enemy ship
   */
  ([] as [number, number][]).forEach(([x, y]) => {
    game.shipFactory.create({
      shipName: "Red",
      team: "Rebellion",
      position: new Victor(x, y),
      yaw: Math.random() * Math.PI,
    });
  });

  const plusFormation = [
    [0, 200],
    [200, 0],
    [0, -200],
    [-200, -0],
  ];

  const clusterFormation = [
    [200, 200],
    [250, 250],
    [200, 250],
    [250, 200],
  ];

  /**
   * Neutral ship
   */
  clusterFormation.forEach(([x, y]) => {
    game.shipFactory.create({
      shipName: "Blue",
      team: "Independent",
      position: new Victor(x, y),
      yaw: Math.random() * Math.PI,
    });
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