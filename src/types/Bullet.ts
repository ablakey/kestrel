import Victor from "victor";
import { IMoveable, IRenderable } from "../interfaces";
import { Entity } from "./Entity";

/**
 * This will be both the bullet instance and all the funcitons for creating a bullet.
 */
export class Bullet extends Entity implements IRenderable, IMoveable {
  angularVelocity: number;
  position: Victor;
  yaw: Victor;
  velocity: Victor;
  zIndex: number;

  constructor(args: { spawned: number; position: Victor; yaw: Victor }) {
    super(args.spawned);

    this.position = args.position.clone();
    this.yaw = args.yaw.clone();
  }
}
