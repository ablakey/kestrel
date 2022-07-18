import { SimState, StateMachine } from "../StateMachine";

export type StateName = "Stopping" | "AimAt";

class StoppingState implements SimState<StateName> {
  name: StateName = "Stopping";

  conditions = {
    AimAt: this.toAimAt,
  };

  entry() {}

  exit() {}

  toAimAt() {
    //
    return false;
  }
}

class AimAtState implements SimState<StateName> {
  name: StateName = "AimAt";
  conditions = {};
}

export function createShipSim() {
  return new StateMachine<StateName>("Stopping", {
    Stopping: StoppingState,
    AimAt: AimAtState,
  });
}

export type ShipSim = ReturnType<typeof createShipSim>;
