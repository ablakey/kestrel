import ReactDOM from "react-dom";
import { ECS } from "./ecs";
import { Tag } from "./enum";
import { ShipFactory } from "./factories/ShipFactory";
import { InputSystem } from "./systems/InputSystem";
import { MovementSystem } from "./systems/movementSystem";
import { RenderSystem } from "./systems/RenderSystem";
import { WeaponSystem } from "./systems/WeaponSystem";
import { Overlay } from "./ui/Overlay";
import { Right } from "./ui/right/Right";

const ecs = new ECS([InputSystem, MovementSystem, WeaponSystem, RenderSystem], {
  ShipFactory,
});

ecs.factories.ShipFactory.create({
  tags: [Tag.Player],
});

ecs.factories.ShipFactory.create({
  x: 250,
  y: 100,
  tags: [Tag.Enemy],
});

ecs.start();

/**
 * One idea for UI is that when the game is ticking, emit an event for every tick.
 * UI can listen to these events and update component tree on tick (or maybe every other tick).
 *
 * But when the game is paused, there are no ticks. So the UI will only respond to the things it does
 * as well as user interaction.
 *
 * When paused, a user could click a menu button, UI state is managed by the UI (useState).
 * User can then cause effects that modify ECS Components, or more UI state.
 *
 * Simple first ideas:
 *  - Pause screen
 *    - recharge shields
 *    - pick different weapon
 *
 *  - Status screen
 *  - Acts on tick callback
 *  - just shows health, speed, etc.
 */
ReactDOM.render(<UiElement />, document.getElementById("ui"));
setInterval(() => {
  ReactDOM.render(<UiElement />, document.getElementById("ui"));
}, 1000);

function UiElement() {
  return (
    <>
      <Overlay />
      <Right />
    </>
  );
}
