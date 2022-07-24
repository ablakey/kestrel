import Victor from "victor";
import { SpriteName } from "../factories/SpriteFactory";
import { IMoveable, IRenderable } from "../interfaces";

let nextId = 1; // Begin at one so that id is always truthy.

export type EntityId = number;
export type Turn = "None" | "Left" | "Right";

/**
 * In this game, an Entity is anything that has a position and can move.
 * Yes, this is not really ECS
 */
export class Entity implements IMoveable, IRenderable {
  destroyed: boolean;
  id: EntityId;
  timeToLive: number | null; // ms until entity should be flagged as destroyed.
  position: Victor;
  yaw: Victor;
  velocity: Victor;
  angularVelocity: number;
  zIndex: number;
  turn: Turn;

  constructor() {
    this.destroyed = false;
    this.id = nextId++;
    this.timeToLive = null;

    // Will almost always be overwritten by the subclass constructor.
    this.yaw = new Victor(1, 0);
    this.position = new Victor(1, 0);
    this.velocity = new Victor(1, 0);
    this.angularVelocity = 0;
    this.zIndex = 1;
    this.turn = "None";
  }

  get definition(): { sprite: SpriteName } {
    throw new Error("Not implemented by subclass.");
  }

  get sprite() {
    return this.definition.sprite;
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
  turnTowards(target: Victor, tolerance?: number) {
    const angle = this.getDeltaAngle(target);
    if (Math.abs(angle) < (tolerance ?? 0.05)) {
      return "None";
    }

    this.turn = angle > 0 ? "Left" : "Right";
  }

  /**
   * Which way to turn to get the body facing the opposite direction of its velocity.
   */
  turnAway() {
    const targetAngle = this.velocity.angle() + Math.PI;
    const targetPosition = new Victor(1, 0).multiplyScalar(1_000_000_000).rotate(targetAngle);
    this.turnTowards(targetPosition);
  }
}
