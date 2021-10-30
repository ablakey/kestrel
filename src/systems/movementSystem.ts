import Victor from "victor";
import { Engine, Body } from "../components";
import { Entity, System } from "../ecs";
import { Direction, Tag, Thrust } from "../enum";

export const MovementSystem = (): System<Engine | Body> => {
  const keyState: Record<string, boolean | undefined> = {};

  document.addEventListener("keydown", (e) => (keyState[e.key] = true));
  document.addEventListener("keyup", (e) => (keyState[e.key] = false));

  function update(entity: Entity<Engine | Body>, delta: number) {
    const { body, engine } = entity.components;
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

    // Add the body's velocity vector to its position, multiplied by how much of a second has passed.
    // We work in seconds so that velocity is a more intuitive concept: pixels per second.
    body.pos.add(body.vel.clone().multiplyScalar(delta / 1000));
  }

  return { componentKinds: ["Engine", "Body"], update };
};
