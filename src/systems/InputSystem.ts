import { Entity, System } from "../ecs";
import { Direction, Tag, Thrust } from "../enum";

export const InputSystem = (): System => {
  const keyState: Record<string, boolean | undefined> = {};

  document.addEventListener("keydown", (e) => (keyState[e.code] = true));
  document.addEventListener("keyup", (e) => (keyState[e.code] = false));

  function update(entity: Entity<"Engine" | "Armament">) {
    // Rotate?
    if (keyState["KeyA"]) {
      entity.components.engine.direction = Direction.Left;
    } else if (keyState["KeyD"]) {
      entity.components.engine.direction = Direction.Right;
    } else {
      entity.components.engine.direction = Direction.None;
    }

    // Thruster?
    entity.components.engine.thrust = keyState["KeyW"] ? Thrust.Forward : Thrust.None;

    // Armament?
    entity.components.armament.primaryFire = keyState["Space"] ?? false;
  }

  return { tags: [Tag.Player], componentKinds: ["Engine", "Armament"], update };
};