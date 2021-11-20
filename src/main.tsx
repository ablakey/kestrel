import { times } from "lodash";
import ReactDOM from "react-dom";
import { ECS } from "./ecs";
import { ShipBehaviour } from "./enum";
import { UiRoot } from "./ui/UiRoot";

const ecs = new ECS();

const playerShip = ecs.utilities.ShipFactory.create({
  x: 0,
  y: 0,
  yaw: 0,
  shipName: "Blue",
  behaviour: ShipBehaviour.Player,
});

playerShip.components.Offensive!.target = 1;

const TEST_RANGE = 1500;
const TEST_COUNT = 3;
times(TEST_COUNT, () => {
  const ship = ecs.utilities.ShipFactory.create({
    x: Math.random() * TEST_RANGE - TEST_RANGE / 2,
    y: Math.random() * TEST_RANGE - TEST_RANGE / 2,
    yaw: 0,
    shipName: "Red",
    behaviour: ShipBehaviour.Aggressive,
  });

  ship.components.Offensive!.target = 0;
});

ecs.start();

/**
 * For debugging?
 * Fundamentally a bad idea to reference things from window? Is prop drilling (or context) really better?
 * None of this is a library or will see re-use.
 */
declare global {
  interface Window {
    ecs: ECS;
  }
}

window.ecs = ecs;

/**
 * UI.
 */
function render() {
  ReactDOM.render(<UiRoot />, document.getElementById("ui"));
}

render();
setInterval(render, 100);
