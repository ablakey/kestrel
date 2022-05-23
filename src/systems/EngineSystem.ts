import Victor from "victor";
import { MIN_SPEED } from "../config";
import { Ship } from "../types/Ship";
import { System } from "./System";

export class EngineSystem extends System {
  update(ship: Ship) {
    // Update direction
    if (!ship.turnEnabled) {
      ship.angularVelocity = 0;
    } else if (ship.turn === "Left") {
      console.log(ship.turnRate);
      ship.angularVelocity = ship.turnRate; // TODO: lerp?
    } else if (ship.turn === "Right") {
      ship.angularVelocity = -ship.turnRate;
    } else {
      ship.angularVelocity = 0;
    }

    if (ship.thrust === "Forward" && ship.thrustEnabled) {
      const accelBy = ship.velocity.magnitude() < MIN_SPEED ? MIN_SPEED + 1 : ship.accelSpeed;
      const p = new Victor(accelBy, 0).rotate(ship.yaw.angle());
      ship.velocity.add(p);

      if (ship.velocity.magnitude() > ship.maxSpeed) {
        ship.velocity.normalize().multiplyScalar(ship.maxSpeed);
      }
    }

    /**
     * Avoid cases where bodies are almost stopped and never quite stop.
     */
    if (ship.velocity.magnitude() <= MIN_SPEED) {
      ship.velocity = new Victor(0, 0);
    }
  }
}
