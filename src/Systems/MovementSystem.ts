import { Entity, System } from "../ecs";

/**
 * Updates the Body's position and yaw based on its velocity and rotational velocity.
 */
export const MovementSystem = (): System => {
  function update(entity: Entity<"Body">, delta: number) {
    const deltaSeconds = delta / 1000;
    const { Body } = entity.components;

    Body.position.add(Body.velocity.clone().multiplyScalar(deltaSeconds));
    Body.yaw.rotate(Body.angularVelocity * deltaSeconds);
  }

  return { componentKinds: ["Body"], update };
};
