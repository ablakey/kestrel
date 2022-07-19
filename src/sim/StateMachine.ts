import { Ship } from "../entities/Ship";
import { StateName } from "./ShipSim";

type States = Record<StateName, { new (ship: Ship): SimState }>;

export class StateMachine {
  state: SimState;
  states: States;
  ship: Ship;

  constructor(ship: Ship, initialState: StateName, states: States) {
    this.ship = ship;
    this.states = states;
    this.state = new this.states[initialState](ship);
    this.state.entry?.();
    console.debug(`${this.ship.shipType} (${this.ship.id}): ${this.state.name}`);
  }

  tick() {
    for (const key of Object.keys(this.state.conditions)) {
      if (this.state.conditions[key as StateName]!()) {
        this.transitionTo(key as StateName);
        break;
      }
    }
  }

  private transitionTo(stateName: StateName) {
    console.debug(`${this.ship.id}: ${this.state.name} -> ${stateName}`);
    this.state.exit?.();
    this.state = new this.states[stateName](this.ship);
    this.state.entry?.();
  }
}

export abstract class SimState {
  abstract name: StateName;
  ship: Ship;

  conditions: { [k in StateName]?: () => boolean };

  entry() {}

  exit() {}

  constructor(ship: Ship) {
    this.ship = ship;
    this.conditions = {};
  }
}
