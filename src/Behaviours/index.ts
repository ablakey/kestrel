import { cloneDeep } from "lodash";
import { ShipEntity } from "../Factories/ShipFactory";
import { Game } from "../game";
import { findTargetBehaviour, FindTargetState } from "./findTargetBehaviour";
import { noneBehaviour } from "./noneBehaviour";
import {
  smallShipAggressiveBehaviour,
  SmallShipAggressiveState,
} from "./smallShipAggressiveBehaviour";
import { stopBehaviour, StopState } from "./stopBehaviour";

export type BehaviourState = SmallShipAggressiveState | FindTargetState | NoneState | StopState;

export type NoneState = { name: "None" };

export type BehaviourName = BehaviourState["name"];

export const Behaviours: Record<
  BehaviourName,
  (game: Game, entity: ShipEntity, delta: number) => void
> = {
  None: noneBehaviour,
  SmallShipAggressive: smallShipAggressiveBehaviour,
  FindTarget: findTargetBehaviour,
  Stop: stopBehaviour,
};

const initialBehaviourStates: Record<BehaviourName, BehaviourState> = {
  SmallShipAggressive: {
    name: "SmallShipAggressive",
    timer: null,
    stage: "None",
  },
  FindTarget: { name: "FindTarget" },
  None: { name: "None" },
  Stop: { name: "Stop" },
};

export function getInitialBehaviourState(name: BehaviourName): BehaviourState {
  return cloneDeep(initialBehaviourStates[name]);
}
