import Victor from "victor";
import { Engine } from "../Components/Engine";
import { MIN_SPEED } from "../config";
import { ShipEntity } from "../Factories/ShipFactory";
import { System } from "../game";

export const EngineSystem = (): System => {
  function update(ship: ShipEntity) {
    const { body, engine, kinematics } = ship.components;

    // Update direction
    if (!Engine.turnEnabled(ship)) {
      body.angularVelocity = 0;
    } else if (engine.direction === "Left") {
      body.angularVelocity = kinematics.turnRate; // TODO: lerp?
    } else if (engine.direction === "Right") {
      body.angularVelocity = -kinematics.turnRate;
    } else {
      body.angularVelocity = 0;
    }

    if (engine.thrust === "Forward" && Engine.thrustEnabled(ship)) {
      const accelBy = body.velocity.magnitude() < MIN_SPEED ? MIN_SPEED + 1 : kinematics.accelSpeed;
      const p = new Victor(accelBy, 0).rotate(body.yaw.angle());
      body.velocity.add(p);

      if (body.velocity.magnitude() > kinematics.maxSpeed) {
        body.velocity.normalize().multiplyScalar(kinematics.maxSpeed);
      }
    }

    /**
     * Avoid cases where bodies are almost stopped and never quite stop.
     */
    if (body.velocity.magnitude() <= MIN_SPEED) {
      body.velocity = new Victor(0, 0);
    }
  }

  return { kindsOrArchetype: "ShipEntity", update };
};
