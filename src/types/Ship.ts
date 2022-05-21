import Victor from "victor";
import { SpriteName } from "../factories/SpriteFactory";
import { IRenderable } from "../interfaces";
import { Entity, EntityId } from "./Entity";

type Team = "Independent" | "Player" | "Rebellion" | "Confederacy";

type ShipType = "Blue" | "Red";

type Turn = "None" | "Left" | "Right";

export class Ship extends Entity implements IRenderable {
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

  constructor(args: {
    spawned: number;
    shipType: ShipType;
    team: Team;
    position: Victor;
    yaw: Victor;
  }) {
    super(args.spawned);
    this.yaw = args.yaw;
    this.position = args.position;
    this.angularVelocity = 0;
    this.velocity = new Victor(11, 0);
    this.sprite = "BlueShip";
    this.zIndex = 1;
    this.target = null;
    this.turn = "None";
    this.thrust = "None";
    this.firePrimary = false;
    this.fireSecondary = false;
  }

  /**
   * Get the angle in radians between a source and a target.
   * This is how far the source has to rotate to point at the target.  The sign (positive or negative)
   * describes which way to turn to shrink the delta.
   *
   * From: https://math.stackexchange.com/questions/110080/shortest-way-to-achieve-target-angle
   */
  public getDeltaAngle(target: Victor) {
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
  public getOppositeTurn(): Turn {
    const targetAngle = this.velocity.angle() + Math.PI;
    const targetPosition = new Victor(1, 0).multiplyScalar(1_000_000_000).rotate(targetAngle);
    return this.getTurn(targetPosition);
  }
}

export class PlayerShip extends Ship {
  foo = "bar"; // TODO
}
