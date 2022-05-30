import Victor from "victor";
import { Engine } from "./Engine";
import { PlayerShip, Ship } from "./types/Ship";

declare global {
  interface Window {
    engine: any;
  }
}

async function main() {
  const engine = new Engine();
  await engine.initialize();
  engine.start();
  window.engine = engine;
  // function render() {
  //   ReactDOM.render(<Layout game={game} />, document.getElementById("ui"));
  //   requestAnimationFrame(render);
  // }
  // render();

  engine.entities.setPlayerShip(
    new PlayerShip({
      position: new Victor(0, 0),
      shipName: "Blue",
      team: "Player",
      yaw: new Victor(1, 0),
    })
  );

  engine.entities.addShip(
    new Ship({
      position: new Victor(-100, 100),
      shipName: "Red",
      team: "Rebellion",
      yaw: new Victor(0, 0),
    })
  );
}

main();
