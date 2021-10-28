import { Direction, Thrust } from "./enum";

export type Position = {
  type: "Position";
  x: number;
  y: number;
  yaw: number;
};

export type Rect = {
  type: "Rect";
  width: number;
  height: number;
};

// export type UserInput = {
//   type: "UserInput";
//   w: boolean;
//   a: boolean;
//   s: boolean;
//   d: boolean;
// };

export type Engine = {
  type: "Engine";
  direction: Direction;
  thrust: Thrust;
};

export type Component = Position | Rect | Engine;
