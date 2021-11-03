import { Direction, Thrust } from "./enum";
import Victor from "victor";

// export type Sprite   <- need to start associating sprites with entities.

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

export type Armament = {
  kind: "Armament";
  primaryFire: boolean;
  primaryCooldownUntil: number;
};

export type Bullet = {
  kind: "Bullet";
  lifespan: number;
};

export type Component = Body | Engine | Armament | Bullet;
