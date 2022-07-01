import { Ship } from "../entities/Ship";

type AiState = "STOPPING" | "OTHER"; // TODO

type FsmConfig = {
  initial: AiState;
  entry: (ship: Ship) => void;
  exit: (ship: Ship) => void;
  nextStates: Record<
    AiState,
    {
      condition: (ship: Ship) => boolean;
    }
  >;
};

export class ShipAi {
  state: ShipAiState;
  states: Record<AiState, { new (): ShipAiState }> = {
    STOPPING: FooState,
    OTHER: FooState,
  };

  constructor() {
    this.state = new this.states[this.initialState]();
  }

  initialState: AiState = "STOPPING";

  tick() {
    this.state.conditions.forEach((condition, stateName) => {
      if (condition()) {
        this.transitionTo(stateName);
      }
    });
  }

  private transitionTo(stateName: AiState) {
    this.state.exit?.();
    this.state = new this.states[stateName]();
    this.state.entry?.();
  }
}

abstract class ShipAiState {
  entry?() {}
  exit?() {}
  abstract conditions: Map<AiState, () => boolean>;
}

export class FooState extends ShipAiState {
  stateName: AiState = "STOPPING";

  conditions = {
    someState: this.toCondition,
  };

  entry() {}

  exit() {}

  toCondition() {}
}

/**
 * Initial state
 * dict of states:
 *   - for each state, a list of states it can switch to
 *   - for each state it can switch to, a function that returns bool for whether its time to
 *     - this function is tested each tick. Just the one that's possible
 *   - when transition occurs, run an exit fn (optional) and an entry fn (optional)
 *
 */
