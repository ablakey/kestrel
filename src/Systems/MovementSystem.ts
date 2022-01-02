import { Entity, System } from "../game";

/**
 * Updates the Body's position and yaw based on its velocity and rotational velocity.
 */
export const MovementSystem = (): System => {
  function update(entity: Entity<"Body">, delta: number) {
    const deltaSeconds = delta / 1000;
    const { body } = entity.components;

    body.position.add(body.velocity.clone().multiplyScalar(deltaSeconds));
    body.yaw.rotate(body.angularVelocity * deltaSeconds);
  }

  return { kindsOrArchetype: ["Body"], update };
};
