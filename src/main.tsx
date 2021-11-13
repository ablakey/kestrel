import { times } from "lodash";
import ReactDOM from "react-dom";
import { ECS } from "./ecs";
import { ShipBehaviour } from "./enum";
import { AICombatSystem } from "./systems/AICombatSystem";
import { AIMovementSystem } from "./systems/AIMovementSystem";
import { BulletSystem } from "./systems/BulletSystem";
import { CombatSystem } from "./systems/CombatSystem";
import { EngineSystem } from "./systems/EngineSystem";
import { InputSystem } from "./systems/InputSystem";
import { MovementSystem } from "./systems/MovementSystem";
import { RenderSystem } from "./systems/RenderSystem";
import { StatsSystem } from "./systems/StatsSystem";
import { UiRoot } from "./ui/UiRoot";

const ecs = new ECS([
  InputSystem,
  AIMovementSystem,
  AICombatSystem,
  EngineSystem,
  MovementSystem,
  CombatSystem,
  BulletSystem,
  StatsSystem,
  RenderSystem,
]);

ecs.factories.ShipFactory.create({
  x: 0,
  y: 0,
  yaw: 0,
  shipName: "Blue",
  behaviour: ShipBehaviour.Player,
});

const TEST_RANGE = 1500;
const TEST_COUNT = 3;
times(TEST_COUNT, () => {
  const ship = ecs.factories.ShipFactory.create({
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
