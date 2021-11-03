import Victor from "victor";
import { Engine, Body } from "../components";
import { Entity, System } from "../ecs";
import { Direction, Tag, Thrust } from "../enum";

export const EngineSystem = (): System<Engine | Body> => {
  const keyState: Record<string, boolean | undefined> = {};

  document.addEventListener("keydown", (e) => (keyState[e.key] = true));
  document.addEventListener("keyup", (e) => (keyState[e.key] = false));

  function update(entity: Entity<Engine | Body>) {
    const { body, engine } = entity.components;

    // Update
    if (engine.direction === Direction.Left) {
      body.yaw += 0.05;
    } else if (engine.direction === Direction.Right) {
      body.yaw -= 0.05; // TODO: this hsould be a variable.
    }

    if (entity.tags.includes(Tag.Enemy)) {
      return;
    }

    // Update the ship's velocity.
    if (engine.thrust === Thrust.Forward) {
      const p = new Victor(4, 0).rotate(body.yaw);
      body.vel.add(p);
    }
  }

  return { componentKinds: ["Engine", "Body"], update };
};
