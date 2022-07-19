import { Ship } from "../../entities/Ship";
import { SimState, StateMachine } from "../StateMachine";

export type StateName = "Stopping" | "PointAt";

class StoppingState extends SimState {
  name: StateName = "Stopping";

  conditions = {
    PointAt: this.toPointAt,
  };

  entry() {}

  exit() {}

  toPointAt() {
    return false;
  }
}

class AimAtState extends SimState {
  name: StateName = "PointAt";
  conditions = {};
}

export function createShipSim(ship: Ship) {
  return new StateMachine(ship, "Stopping", {
    Stopping: StoppingState,
    PointAt: AimAtState,
  });
}

export type ShipSim = ReturnType<typeof createShipSim>;
