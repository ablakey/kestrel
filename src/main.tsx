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

ecs.factories.ShipFactory.create({
  pos: new Victor(0, 0),
  yaw: 0,
  shipName: "Blue",
});

const TEST_RANGE = 3000;
const TEST_COUNT = 400;
times(TEST_COUNT, () => {
  ecs.factories.ShipFactory.create({
    pos: new Victor(
      Math.random() * TEST_RANGE - TEST_RANGE / 2,
      Math.random() * TEST_RANGE - TEST_RANGE / 2
    ),
    yaw: 0,
    shipName: "Red",
  });

  ecs.query(["Offensive"]).forEach((e) => {
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
