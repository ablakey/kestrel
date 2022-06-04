import { cloneDeep } from "lodash";
import { DeepReadonly } from "ts-essentials";
import Victor from "victor";
import { ZIndexes } from "../config";
import { Item, ItemName, ShipName, WeaponName } from "../definitions";
import { shipDefinitions } from "../definitions/ships";
import { primaryWeaponNames } from "../definitions/weapons";
import { DamageEffect } from "../Effects";
import { IRenderable } from "../interfaces";
import { Entity, EntityId, Turn } from "./Entity";

export type Team = "Independent" | "Player" | "Rebellion" | "Confederacy";
export type Condition = "Alive" | "Disabled" | "Destroying";
export type Size = "Small" | "Normal" | "Large" | "Massive";

export class Ship extends Entity implements IRenderable {
  condition: Condition;
  effects: DamageEffect[];
  firePrimary: boolean;
  fireSecondary: boolean;
  hp: number;
  items: Item[];
  shipName: ShipName;
  target: EntityId | null;
  thrust: "None" | "Forward";
  turn: Turn;
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
}

// Mostly just a token to identify a playership over a ship.
// But there will definitely be player-specific properties to manage?
// Unless those live in the game state.
export class PlayerShip extends Ship {
  foo = "bar"; // TODO
}
