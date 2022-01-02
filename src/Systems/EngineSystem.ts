import Victor from "victor";
import { Direction, Thrust } from "../enum";
import { ShipEntity } from "../Factories/ShipFactory";
import { System } from "../game";

export const EngineSystem = (): System => {
  function update(ship: ShipEntity) {
    const { body, engine, kinematics } = ship.components;

    // Update direction
    if (engine.direction === Direction.Left) {
      body.angularVelocity = kinematics.turnRate; // TODO: lerp?
    } else if (engine.direction === Direction.Right) {
      body.angularVelocity = -kinematics.turnRate;
    } else {
      body.angularVelocity = 0;
    }

    if (engine.thrust === Thrust.Forward && ShipEntity.thrustEnabled(ship)) {
      const p = new Victor(4, 0).rotate(body.yaw.angle());
      body.velocity.add(p);

      if (body.velocity.magnitude() > kinematics.maxSpeed) {
        body.velocity.normalize().multiplyScalar(kinematics.maxSpeed);
      }
    }
  }

  return { kindsOrArchetype: "ShipEntity", update };
};
