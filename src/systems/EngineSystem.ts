import Victor from "victor";
import { Entity, System } from "../ecs";
import { Direction, Thrust } from "../enum";

export const EngineSystem = (): System => {
  function update(entity: Entity<"Engine" | "Body" | "Kinematics">) {
    const { body, engine, kinematics } = entity.components;

    // Update direction
    if (engine.direction === Direction.Left) {
      body.angularVelocity = kinematics.turnRate; // TODO: lerp?
    } else if (engine.direction === Direction.Right) {
      body.angularVelocity = -kinematics.turnRate;
    }

    // Update the ship's velocity.
    if (engine.thrust === Thrust.Forward) {
      const p = new Victor(4, 0).rotate(body.yaw);
      body.velocity.add(p);
    }
  }

  return { componentKinds: ["Engine", "Body", "Kinematics"], update };
};
