import Victor from "victor";
import { ZIndex } from "../config";
import { IMoveable, IRenderable } from "../interfaces";
import { WeaponName } from "../definitions";
import { weaponDefinitions } from "../definitions/weapons";
import { Entity, EntityId } from "./Entity";

/**
 * This will be both the bullet instance and all the funcitons for creating a bullet.
 */
export class Bullet extends Entity implements IRenderable, IMoveable {
  weaponName: WeaponName;
  target: EntityId | null;
  zIndex = ZIndex.Bullet;

  constructor(args: {
    position: Victor;
    yaw: Victor;
    weaponName: WeaponName;
    target: EntityId | null;
  }) {
    super();
    this.weaponName = args.weaponName; // Must be assigned first to provide access to definition in constructor.

    this.angularVelocity = 0;
    this.weaponName = args.weaponName;
    this.target = args.target;
    this.position = args.position.clone();
    this.target = args.target;
    this.velocity = args.yaw.clone().multiplyScalar(this.definition.speed);
    this.yaw = args.yaw.clone();
    this.timeToLive = this.definition.lifespan;
  }

  get definition() {
    return weaponDefinitions[this.weaponName];
  }
}
