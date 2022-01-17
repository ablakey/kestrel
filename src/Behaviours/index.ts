import { ShipEntity } from "../Factories/ShipFactory";
import { Game } from "../game";
import { findTarget } from "./findTarget";
import {
  smallShipAggressive,
  smallShipAggressiveInitialState,
  SmallShipAggressiveState,
} from "./smallShipAggressive";

export type CombatAction = "Aggressive" | "Defensive" | "None";

export type MovementAction = "PointAt" | "FlyThrough" | "None";

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
  None: () => {
    return undefined;
  },
  SmallShipAggressive: smallShipAggressive,
  FindTarget: findTarget,
};

export const initialBehaviourStates: Record<BehaviourName, BehaviourState> = {
  SmallShipAggressive: smallShipAggressiveInitialState,
  FindTarget: { name: "FindTarget" },
  None: { name: "None" },
};
