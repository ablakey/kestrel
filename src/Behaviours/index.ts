import { jumpToSystem } from "./jumpToSystem";

export const Behaviours = {
  JumpToSystem: jumpToSystem,
};

export type BehaviourName = keyof typeof Behaviours;

export type CombatAction = "Aggressive" | "Defensive" | "None";

export type MovementAction = "PointAt" | "FlyThrough";
