import { cloneDeep } from "lodash";
import Victor from "victor";
import { ZIndexes } from "../config";
import { DamageEffect } from "../Effects";
import { SpriteName } from "../factories/SpriteFactory";
import { IMoveable, IRenderable } from "../interfaces";
import { Item, ItemName, ShipName, WeaponName } from "../items";
import { shipDefinitions } from "../items/ships";
import { primaryWeaponNames } from "../items/weapons";
import { Entity, EntityId } from "./Entity";
import { DeepReadonly } from "ts-essentials";
export type Team = "Independent" | "Player" | "Rebellion" | "Confederacy";
export type Turn = "None" | "Left" | "Right";
export type Condition = "Alive" | "Disabled" | "Destroying";
export type Size = "Small" | "Normal" | "Large" | "Massive";

export class Ship extends Entity implements IRenderable, IMoveable {
  angularVelocity: number; // radians per second
  condition: Condition;
  effects: DamageEffect[];
  firePrimary: boolean;
  fireSecondary: boolean;
  hp: number;
  items: Item[];
  position: Victor;
  shipName: ShipName;
  sprite: SpriteName;
  target: EntityId | null;
  thrust: "None" | "Forward";
  turn: Turn;
  velocity: Victor;
  yaw: Victor;
  zIndex = ZIndexes.Ship;

  /**
   * Each kind of item can have a stateful cooldown, representing ms remaining until next use.
   * If a ship has multiple of the same item (eg. 3 Proton Cannons) that just means the cooldown is 1/3 as much.
   */
  cooldowns: Map<ItemName, number>;

  constructor(args: { shipName: ShipName; team: Team; position: Victor; yaw: Victor }) {
    super();
    this.shipName = args.shipName; // Must be assigned first for rest of constructor to access.

    this.angularVelocity = 0;
    this.condition = "Alive";
    this.cooldowns = new Map();
    this.effects = [];
    this.firePrimary = false;
    this.fireSecondary = false;
    this.hp = this.definition.maxHp;
    this.items = cloneDeep(this.definition.startingItems);
    this.position = args.position.clone();
    this.sprite = "BlueShip";
    this.target = null;
    this.thrust = "None";
    this.turn = "None";
    this.velocity = new Victor(0, 0);
    this.yaw = args.yaw.clone();
  }

  get definition() {
    return shipDefinitions[this.shipName];
  }

  /**
   * We don't just get from definition directly because these will be modified by buffs, inventory, etc.
   */
  get maxHp() {
    console.log(this.definition, this.shipName);
    return this.definition.maxHp;
  }

  get turnRate() {
    return this.definition.turnRate;
  }

  get maxSpeed() {
    return this.definition.maxSpeed;
  }

  get accelSpeed() {
    return this.definition.accelSpeed;
  }

  get thrustEnabled(): boolean {
    return this.condition !== "Destroying";
  }

  get turnEnabled(): boolean {
    return this.condition !== "Destroying";
  }

  /**
   * Return an array of primary weapons, on this ship, along with their current cooldown.
   */
  get primaryWeapons(): DeepReadonly<
    {
      name: WeaponName;
      count: number;
    }[]
  > {
    const weapons = this.items.filter((i) => primaryWeaponNames.includes(i.name));
    return weapons.map((w) => ({
      name: w.name as WeaponName,
      count: w.count,
    }));
  }

  /**
   * Get the angle in radians between a source and a target.
   * This is how far the source has to rotate to point at the target.  The sign (positive or negative)
   * describes which way to turn to shrink the delta.
   *
   * From: https://math.stackexchange.com/questions/110080/shortest-way-to-achieve-target-angle
   */
  getDeltaAngle(target: Victor) {
    const targetAngle = this.position.clone().subtract(target).norm().angle() - Math.PI;
    return ((targetAngle - this.yaw.angle() + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
  }

  /**
   * Given a source, target, and tolerance (to prevent constant jittering), return which direction (or
   * None) to turn towards.
   */
  getTurn(target: Victor, tolerance?: number): Turn {
    const angle = this.getDeltaAngle(target);
    if (Math.abs(angle) < (tolerance ?? 0.05)) {
      return "None";
    }

    return angle > 0 ? "Left" : "Right";
  }
  /**
   * Which way to turn to get the body facing the opposite direction of its velocity.
   */
  getOppositeTurn(): Turn {
    const targetAngle = this.velocity.angle() + Math.PI;
    const targetPosition = new Victor(1, 0).multiplyScalar(1_000_000_000).rotate(targetAngle);
    return this.getTurn(targetPosition);
  }
}

// Mostly just a token to identify a playership over a ship.
// But there will definitely be player-specific properties to manage?
// Unless those live in the game state.
export class PlayerShip extends Ship {
  foo = "bar"; // TODO
}
