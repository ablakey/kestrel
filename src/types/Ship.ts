import Victor from "victor";
import { DamageEffect } from "../Effects";
import { SpriteName } from "../factories/SpriteFactory";
import { IRenderable } from "../interfaces";
import { shipDefinitions, ShipType } from "../definitions/Ships";
import { Entity, EntityId } from "./Entity";

type Team = "Independent" | "Player" | "Rebellion" | "Confederacy";

type Turn = "None" | "Left" | "Right";

type Condition = "Alive" | "Disabled" | "Destroying";

export type Size = "Small" | "Normal" | "Large" | "Massive";

export class Ship extends Entity implements IRenderable {
  shipType: ShipType;
  position: Victor;
  velocity: Victor;
  yaw: Victor;
  angularVelocity: number; // radians per second
  zIndex: number;
  sprite: SpriteName;
  target: EntityId | null;
  turn: Turn;
  thrust: "None" | "Forward";
  firePrimary: boolean;
  fireSecondary: boolean;
  hp: number;
  effects: DamageEffect[];
  condition: Condition;
  inventory: ItemInstance[];

  constructor(args: {
    spawned: number;
    shipType: ShipType;
    team: Team;
    position: Victor;
    yaw: Victor;
  }) {
    super(args.spawned);

    this.shipType = args.shipType;
    this.yaw = args.yaw.clone();
    this.position = args.position.clone();
    this.angularVelocity = 0;
    this.velocity = new Victor(0, 0);
    this.sprite = "BlueShip";
    this.zIndex = 1;
    this.target = null;
    this.turn = "None";
    this.thrust = "None";
    this.firePrimary = false;
    this.fireSecondary = false;
    this.hp = this.maxHp;
    this.effects = [];
    this.condition = "Alive";
  }

  get definition() {
    return shipDefinitions[this.shipType];
  }

  /**
   * We don't just talk to definition directly because these will be modified by buffs, inventory, etc.
   */
  get maxHp() {
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
