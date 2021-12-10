import Victor from "victor";
import { Entity, System } from "../game";
import { Direction, Thrust } from "../enum";

export const EngineSystem = (): System => {
  function update(entity: Entity<"Engine" | "Body" | "Kinematics">) {
    const { body, engine, kinematics } = entity.components;

    // Update direction
    if (engine.direction === Direction.Left) {
      body.angularVelocity = kinematics.turnRate; // TODO: lerp?
    } else if (engine.direction === Direction.Right) {
      body.angularVelocity = -kinematics.turnRate;
    } else {
      body.angularVelocity = 0;
    }

    // Update the ship's velocity.
    if (engine.thrust === Thrust.Forward) {
      const p = new Victor(4, 0).rotate(body.yaw.angle());
      body.velocity.add(p);

      if (body.velocity.magnitude() > kinematics.maxSpeed) {
        body.velocity.normalize().multiplyScalar(kinematics.maxSpeed);
      }
    }
  }

  return { componentKinds: ["Engine", "Body", "Kinematics"], update };
};
