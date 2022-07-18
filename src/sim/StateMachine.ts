type States<Name extends string> = Record<Name, { new (): SimState<Name> }>;

export class StateMachine<Name extends string> {
  state: SimState<Name>;
  states: States<Name>;

  constructor(initialState: Name, states: States<Name>) {
    this.states = states;
    this.state = new this.states[initialState]();
  }

  tick() {
    for (const key of Object.keys(this.state.conditions)) {
      if (this.state.conditions[key as Name]!()) {
        this.transitionTo(key as Name);
        break;
      }
    }
  }

  private transitionTo(stateName: Name) {
    this.state.exit?.();
    this.state = new this.states[stateName]();
    this.state.entry?.();
  }
}

export interface SimState<Name extends string> {
  entry?: () => void;
  exit?: () => void;
  conditions: { [k in Name]?: () => boolean };
}
