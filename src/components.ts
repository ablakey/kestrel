import { Direction, Thrust } from "./enum";
import Victor from "victor";

export type Body = {
  type: "Body";
  pos: Victor;
  yaw: number;
  vel: Victor;
};

export type Engine = {
  type: "Engine";
  direction: Direction;
  thrust: Thrust;
};

export type Component = Body | Engine;
