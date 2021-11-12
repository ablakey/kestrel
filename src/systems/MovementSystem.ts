import { Entity, System } from "../ecs";

export const MovementSystem = (): System => {
  function update(entity: Entity<"Body">, delta: number) {
    const { body } = entity.components;

    // Add the body's velocity vector to its position, multiplied by how much of a second has passed.
    // We work in seconds so that velocity is a more intuitive concept: pixels per second.
    body.pos.add(body.vel.clone().multiplyScalar(delta / 1000));
  }

  return { componentKinds: ["Body"], update, tags: [] };
};
