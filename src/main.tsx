import { times } from "lodash";
import ReactDOM from "react-dom";
import Victor from "victor";
import { ECS } from "./ecs";
import { BulletSystem } from "./systems/BulletSystem";
import { EngineSystem } from "./systems/EngineSystem";
import { InputSystem } from "./systems/InputSystem";
import { MovementSystem } from "./systems/MovementSystem";
import { RenderSystem } from "./systems/RenderSystem";
import { StatsSystem } from "./systems/StatsSystem";
import { CombatSystem } from "./systems/CombatSystem";
import { UiRoot } from "./ui/UiRoot";

const ecs = new ECS([
  InputSystem,
  EngineSystem,
  MovementSystem,
  CombatSystem,
  BulletSystem,
  StatsSystem,
  RenderSystem,
]);

const playerShip = ecs.factories.ShipFactory.create({
  x: 0,
  y: 0,
  yaw: 0,
  shipName: "Blue",
});

playerShip.components.player = { kind: "Player" };

const TEST_RANGE = 3000;
const TEST_COUNT = 400;
times(TEST_COUNT, () => {
  ecs.factories.ShipFactory.create({
    x: Math.random() * TEST_RANGE - TEST_RANGE / 2,
    y: Math.random() * TEST_RANGE - TEST_RANGE / 2,
    yaw: 0,
    shipName: "Red",
  });

  ecs.query(["Offensive"]).forEach((e) => {
    if (e.components.player) {
      return;
    }

    e.components.offensive.primaryFire = true;
  });
});

ecs.start();

/**
 * UI.
 */
function render() {
  ReactDOM.render(<UiRoot ecs={ecs} />, document.getElementById("ui"));
}

render();
setInterval(render, 100);

/**
 * For debugging.
 */
declare global {
  interface Window {
    ecs: any;
  }
}

window.ecs = ecs;
