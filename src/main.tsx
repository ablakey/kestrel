import Victor from "victor";
import { Engine } from "./Engine";
import { Ship } from "./types/Ship";

async function main() {
  const engine = new Engine();
  engine.start();
  // function render() {
  //   ReactDOM.render(<Layout game={game} />, document.getElementById("ui"));
  //   requestAnimationFrame(render);
  // }
  // render();

  engine.entities.addShip(
    new Ship({
      position: new Victor(0, 0),
      shipType: "Blue",
      spawned: 0,
      team: "Confederacy",
      yaw: new Victor(0, 0),
    })
  );
}

main();
