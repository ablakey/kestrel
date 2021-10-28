import { Engine } from "../components";
import { Entity, System } from "../ecs";
import { Tag } from "../enum";

export const inputSystem = (): System<Engine> => {
  const keyState: Record<string, boolean | undefined> = {};

  document.addEventListener("keydown", (e) => (keyState[e.key] = true));
  document.addEventListener("keyup", (e) => (keyState[e.key] = false));

  function update(entities: Entity<Engine>[]) {
    const entity = entities[0];
    if (entity === undefined) {
      return;
    }
  }

  return { tags: [Tag.Player], componentTypes: ["Engine"], update };
};
