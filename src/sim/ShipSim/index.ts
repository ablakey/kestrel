import { SimState, StateMachine } from "../StateMachine";

type StateName = "Stopping" | "AimAt";

class StoppingState implements SimState<StateName> {
  stateName: StateName = "Stopping";

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
  conditions = {};
}

export function createShipSim() {
  return new StateMachine<StateName>("Stopping", {
    Stopping: StoppingState,
    AimAt: AimAtState,
  });
}

export type ShipSim = ReturnType<typeof createShipSim>;
