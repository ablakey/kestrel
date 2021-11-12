import { Entity, System } from "../ecs";
import { Direction, Thrust } from "../enum";

export const InputSystem = (): System => {
  const keyState: Record<string, boolean | undefined> = {};

  document.addEventListener("keydown", (e) => (keyState[e.code] = true));
  document.addEventListener("keyup", (e) => (keyState[e.code] = false));

  function update(entity: Entity<"Engine" | "Offensive" | "Player">) {
    // Rotate?
    if (keyState["KeyA"]) {
      entity.components.Engine.direction = Direction.Left;
    } else if (keyState["KeyD"]) {
      entity.components.Engine.direction = Direction.Right;
    } else {
      entity.components.Engine.direction = Direction.None;
    }

    // Thruster?
    entity.components.Engine.thrust = keyState["KeyW"] ? Thrust.Forward : Thrust.None;

    // Armament?
    entity.components.Offensive.primaryFire = keyState["Space"] ?? false;
  }

  return { componentKinds: ["Engine", "Offensive", "Player"], update };
};
