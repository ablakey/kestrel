import { ShipEntity } from "../Factories/ShipFactory";
import { Game } from "../game";
import { findTargetBehaviour } from "./findTargetBehaviour";
import { noneBehaviour } from "./noneBehaviour";
import {
  smallShipAggressiveBehaviour,
  smallShipAggressiveInitialState,
  SmallShipAggressiveState,
} from "./smallShipAggressiveBehaviour";

export type BehaviourState = SmallShipAggressiveState | FindTargetState | NoneState;

export type FindTargetState = {
  name: "FindTarget";
};

export type NoneState = { name: "None" };

export type BehaviourName = BehaviourState["name"];

export const Behaviours: Record<
  BehaviourName,
  (game: Game, entity: ShipEntity, delta: number) => void
> = {
  None: noneBehaviour,
  SmallShipAggressive: smallShipAggressiveBehaviour,
  FindTarget: findTargetBehaviour,
};

const initialBehaviourStates: Record<BehaviourName, BehaviourState> = {
  SmallShipAggressive: smallShipAggressiveInitialState,
  FindTarget: { name: "FindTarget" },
  None: { name: "None" },
};

export function getInitialBehaviourState(name: BehaviourName): BehaviourState {
  return { ...initialBehaviourStates[name] };
}
