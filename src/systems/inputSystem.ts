import { Engine } from "../components";
import { Entity, System } from "../ecs";
import { Direction, Tag, Thrust } from "../enum";

export const inputSystem = (): System<Engine> => {
  const keyState: Record<string, boolean | undefined> = {};

  document.addEventListener("keydown", (e) => (keyState[e.key] = true));
  document.addEventListener("keyup", (e) => (keyState[e.key] = false));

  function update(entities: Entity<Engine>[]) {
    // We only have one ship with the tag Player.
    const entity = entities[0];
    if (entity === undefined) {
      return;
    }

    if (keyState["a"]) {
      entity.components.Engine.direction = Direction.Left;
    } else if (keyState["d"]) {
      entity.components.Engine.direction = Direction.Right;
    } else {
      entity.components.Engine.direction = Direction.None;
    }

    entity.components.Engine.thrust = keyState["w"] ? Thrust.Forward : Thrust.None;
  }

  return { tags: [Tag.Player], componentTypes: ["Engine"], update };
};
