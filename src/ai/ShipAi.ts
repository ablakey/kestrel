type StateName = "Stopping" | "AimAt";
import { AiState, AiMachine } from "./machine";

class StoppingState implements AiState<StateName> {
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

class AimAtState implements AiState<StateName> {
  conditions = {};
}

export function createAiInstance() {
  return new AiMachine<StateName>("Stopping", {
    Stopping: StoppingState,
    AimAt: AimAtState,
  });
}
