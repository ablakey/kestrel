import Victor from "victor";
import { Entity, System } from "../game";
import { Direction, Thrust } from "../enum";

export const EngineSystem = (): System => {
  function update(entity: Entity<"Engine" | "Body" | "Kinematics">) {
    const { Body, Engine, Kinematics } = entity.components;

    // Update direction
    if (Engine.direction === Direction.Left) {
      Body.angularVelocity = Kinematics.turnRate; // TODO: lerp?
    } else if (Engine.direction === Direction.Right) {
      Body.angularVelocity = -Kinematics.turnRate;
    } else {
      Body.angularVelocity = 0;
    }

    // Update the ship's velocity.
    if (Engine.thrust === Thrust.Forward) {
      const p = new Victor(4, 0).rotate(Body.yaw.angle());
      Body.velocity.add(p);

      if (Body.velocity.magnitude() > Kinematics.maxSpeed) {
        Body.velocity.normalize().multiplyScalar(Kinematics.maxSpeed);
      }
    }
  }

  return { componentKinds: ["Engine", "Body", "Kinematics"], update };
};
