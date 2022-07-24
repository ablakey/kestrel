import { assert } from "ts-essentials";
import { MIN_SPEED } from "../../config";
import { Ship } from "../../entities/Ship";
import { SimState, StateMachine } from "../StateMachine";

export type StateName = "Stopping" | "PointAt";

class StoppingState extends SimState {
  name: StateName = "Stopping";

  tick() {}

  conditions = {
    PointAt: this.toPointAt,
  };

  toPointAt() {
    return this.ship.velocity.magnitude() < MIN_SPEED;
  }
}

class PointAtState extends SimState {
  tick() {
    const target = engine.entities.getShip(this.ship.target);
    assert(target);
    this.ship.turnTowards(target.position);
  }

  name: StateName = "PointAt";
  conditions = {};
}

export function createShipSim(ship: Ship) {
  return new StateMachine(ship, "Stopping", {
    Stopping: StoppingState,
    PointAt: PointAtState,
  });
}

export type ShipSim = ReturnType<typeof createShipSim>;
