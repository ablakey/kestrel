import { Direction, Thrust } from "./enum";
import Victor from "victor";

export type Body = {
  kind: "Body";
  pos: Victor;
  yaw: number;
  vel: Victor;
};

export type Engine = {
  kind: "Engine";
  direction: Direction;
  thrust: Thrust;
};

export type Weapons = {
  kind: "Weapons";
  fireLaser: boolean;
  laserCharge: number;
};

export type Component = Body | Engine | Weapons;
