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

  constructor(args: { position: Victor; yaw: Victor; weaponName: WeaponName; target?: EntityId }) {
    super();

    this.weaponName = args.weaponName;
    this.target = args.target ?? null;
    this.position = args.position.clone();
    this.yaw = args.yaw.clone();
    this.velocity = args.yaw.clone().multiplyScalar(this.definition.speed);
    this.angularVelocity = 0;
  }

  get definition() {
    return weaponDefinitions[this.weaponName];
  }

  get sprite() {
    return this.definition.sprite;
  }
}
