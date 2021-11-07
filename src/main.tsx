import { times } from "lodash";
import ReactDOM from "react-dom";
import Victor from "victor";
import { ECS } from "./ecs";
import { Tag } from "./enum";
import { ShipFactory } from "./factories/ShipFactory";
import { BulletSystem } from "./systems/BulletSystem";
import { EngineSystem } from "./systems/EngineSystem";
import { InputSystem } from "./systems/InputSystem";
import { MovementSystem } from "./systems/MovementSystem";
import { RenderSystem } from "./systems/RenderSystem";
import { StatsSystem } from "./systems/StatsSystem";
import { WeaponSystem } from "./systems/WeaponSystem";
import { UiRoot } from "./ui/UiRoot";

const ecs = new ECS([
  InputSystem,
  EngineSystem,
  MovementSystem,
  WeaponSystem,
  BulletSystem,
  StatsSystem,
  RenderSystem,
]);

ecs.factories.ShipFactory.create({
  pos: new Victor(0, 0),
  yaw: 0,
  shipType: ShipFactory.ShipTypes.Blue,
  tags: [Tag.Player],
});

times(3, () => {
  ecs.factories.ShipFactory.create({
    pos: new Victor(Math.random() * 1000 - 500, Math.random() * 1000 - 500),
    yaw: 0,
    shipType: ShipFactory.ShipTypes.Red,
    tags: [Tag.Enemy],
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
