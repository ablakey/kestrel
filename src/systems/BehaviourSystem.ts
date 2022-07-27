import { Ship } from "../entities/Ship";
import { behaviours } from "../sim";
import { System } from "./System";

export class BehaviourSystem extends System {
  update() {
    this.engine.entities.ships.forEach(this.updateOne);
  }

  private updateOne(ship: Ship) {
    // For now do not simulate player ship.  Perhaps in the future we have some form of autopilot and such.
    if (ship === this.engine.entities.playerShip) {
      return;
    }

    if (ship.behaviour === null) {
      return;
    }

    behaviours[ship.behaviour](this.engine, ship);
  }
}
