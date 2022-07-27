import { Engine } from "../Engine";
import { Ship } from "../entities/Ship";
import { attackBehaviour } from "./AttackBehaviour";

export type BehaviourName = "Attack";

export const behaviours: Record<BehaviourName, (engine: Engine, ship: Ship) => void> = {
  Attack: attackBehaviour,
};
