import { times } from "lodash";
import ReactDOM from "react-dom";
import { ECS } from "./ecs";
import { Team } from "./enum";
import { UiRoot } from "./ui/UiRoot";

const ecs = new ECS();

const playerShip = ecs.utilities.ShipFactory.create({
  x: 0,
  y: 0,
  yaw: 0,
  shipName: "Blue",
  team: Team.Player,
});

playerShip.components.Player = { kind: "Player" };
playerShip.components.Offensive!.target = 1;

const TEST_RANGE = 1500;
const TEST_COUNT = 1;
times(TEST_COUNT, () => {
  const ship = ecs.utilities.ShipFactory.create({
    x: Math.random() * TEST_RANGE - TEST_RANGE / 2,
    y: Math.random() * TEST_RANGE - TEST_RANGE / 2,
    yaw: 0,
    shipName: "Red",
    runAi: true,
    team: Team.Independent,
  });

  ship.components.Offensive!.target = 0;
});

ecs.start();

declare global {
  interface Window {
    _ecs: ECS;
  }
}

window._ecs = ecs;

/**
 * UI.
 */
function render() {
  ReactDOM.render(<UiRoot ecs={ecs} />, document.getElementById("ui"));
  requestAnimationFrame(render);
}

render();
