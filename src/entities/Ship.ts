import { cloneDeep } from "lodash";
import { DeepReadonly } from "ts-essentials";
import Victor from "victor";
import { ZIndex } from "../config";
import { Item, ItemName, PrimaryWeaponName, SecondaryWeaponName, ShipType } from "../definitions";
import { shipDefinitions } from "../definitions/ships";
import { primaryWeaponDefinitions } from "../definitions/weapons";
import { DamageEffect } from "../Effects";
import { IRenderable } from "../interfaces";
import { BehaviourName } from "../sim";
import { Entity, EntityId, Turn } from "./Entity";

export type Team = "Independent" | "Player" | "Rebellion" | "Confederacy";
export type Condition = "Alive" | "Disabled" | "Destroying";
export type Size = "Small" | "Normal" | "Large" | "Massive";
export type Strategy = "Land" | "None";

export class Ship extends Entity implements IRenderable {
  condition: Condition;
  effects: DamageEffect[];
  firePrimary: boolean;
  fireSecondary: boolean;
  hp: number;
  items: Item[];
  shipType: ShipType;
  target: EntityId | null;
  thrust: "None" | "Forward";
  turn: Turn;
  zIndex = ZIndex.Ship;
  behaviour: BehaviourName | null;
  strategy: Strategy;

  /**
   * Each kind of item can have a stateful cooldown, representing ms remaining until next use.
   * If a ship has multiple of the same item (eg. 3 Proton Cannons) that just means the cooldown is 1/3 as much.
   */
  cooldowns: Map<ItemName, number>;

  constructor(args: { shipType: ShipType; team: Team; position: Victor; yaw: Victor }) {
    super();
    this.shipType = args.shipType; // Must be assigned first for rest of constructor to access.

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
    this.behaviour = args.team === "Player" ? null : "Attack"; // TODO:
    this.strategy = "None"; // TODO: An actual way to give each new ship a different strategy.
  }

  get definition() {
    return shipDefinitions[this.shipType];
  }

  /**
   * We don't just get from definition directly because these will be modified by buffs, inventory, etc.
   */
  get maxHp() {
    console.log(this.definition, this.shipType);
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
      name: PrimaryWeaponName;
      count: number;
    }[]
  > {
    const weapons = this.items.filter((i) =>
      Object.keys(primaryWeaponDefinitions).includes(i.name)
    );
    return weapons.map((w) => ({
      name: w.name as PrimaryWeaponName,
      count: w.count,
    }));
  }
}

// Mostly just a token to identify a playership over a ship.
// But there will definitely be player-specific properties to manage?
// Unless those live in the game state.
export class PlayerShip extends Ship {
  selectedSecondary: SecondaryWeaponName | null = null;
}
