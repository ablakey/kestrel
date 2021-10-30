import { Engine, Body } from "../components";
import { Entity, System } from "../ecs";
import { Direction } from "../enum";

export const MovementSystem = (): System<Engine | Body> => {
  const keyState: Record<string, boolean | undefined> = {};

  document.addEventListener("keydown", (e) => (keyState[e.key] = true));
  document.addEventListener("keyup", (e) => (keyState[e.key] = false));

  function update(entities: Entity<Engine | Body>[]) {
    entities.forEach((e) => {
      const { Body, Engine } = e.components;
      if (Engine.direction === Direction.Left) {
        Body.yaw += 0.1;
      } else if (Engine.direction === Direction.Right) {
        Body.yaw -= 0.1;
      }
    });
  }

  return { componentTypes: ["Engine", "Body"], update };
};
