import Victor from "victor";
import { ZIndexes } from "../config";
import { IMoveable, IRenderable } from "../interfaces";
import { WeaponName } from "../items";
import { weaponDefinitions } from "../items/weapons";
import { Entity, EntityId } from "./Entity";

/**
 * This will be both the bullet instance and all the funcitons for creating a bullet.
 */
export class Bullet extends Entity implements IRenderable, IMoveable {
  weaponName: WeaponName;
  angularVelocity: number;
  position: Victor;
  yaw: Victor;
  velocity: Victor;
  target: EntityId | null;
  zIndex = ZIndexes.Bullet;

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
  }

  get definition() {
    return weaponDefinitions[this.weaponName];
  }

  get sprite() {
    return this.definition.sprite;
  }
}
