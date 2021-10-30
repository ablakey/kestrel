import { Engine } from "../components";
import { Entity, System } from "../ecs";
import { Direction, Tag, Thrust } from "../enum";

export const InputSystem = (): System<Engine> => {
  const keyState: Record<string, boolean | undefined> = {};

  document.addEventListener("keydown", (e) => (keyState[e.key] = true));
  document.addEventListener("keyup", (e) => (keyState[e.key] = false));

  function update(entity: Entity<Engine>) {
    if (keyState["a"]) {
      entity.components.engine.direction = Direction.Left;
    } else if (keyState["d"]) {
      entity.components.engine.direction = Direction.Right;
    } else {
      entity.components.engine.direction = Direction.None;
    }

    entity.components.engine.thrust = keyState["w"] ? Thrust.Forward : Thrust.None;
  }

  return { tags: [Tag.Player], componentKinds: ["Engine"], update };
};
