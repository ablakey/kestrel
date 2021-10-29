import { Direction, Thrust } from "./enum";
import Victor from "victor";

export type Position = {
  type: "Position";
  x: number;
  y: number;
  yaw: number;
  vec: Victor;
};

export type Engine = {
  type: "Engine";
  direction: Direction;
  thrust: Thrust;
};

export type Component = Position | Engine;
