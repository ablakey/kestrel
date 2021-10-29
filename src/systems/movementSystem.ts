import { Engine, Position } from "../components";
import { Entity, System } from "../ecs";
import { Direction } from "../enum";

export const inputSystem = (): System<Engine | Position> => {
  const keyState: Record<string, boolean | undefined> = {};

  document.addEventListener("keydown", (e) => (keyState[e.key] = true));
  document.addEventListener("keyup", (e) => (keyState[e.key] = false));

  function update(entities: Entity<Engine | Position>[]) {
    entities.forEach((e) => {
      const { Position, Engine } = e.components;
      if (Engine.direction === Direction.Left) {
        Position.yaw += 0.1;
      } else if (Engine.direction === Direction.Right) {
        Position.yaw -= 0.1;
      }
    });
  }

  return { componentTypes: ["Engine", "Position"], update };
};
