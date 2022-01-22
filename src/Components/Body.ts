import Victor from "victor";
import { Engine } from "./Engine";

export interface Body {
  kind: "Body";
  position: Victor;
  velocity: Victor;
  yaw: Victor;
  angularVelocity: number; // radians per second
}

export class Body {
  /**
   * Get the angle in radians between a source and a target.
   * This is how far the source has to rotate to point at the target.  The sign (positive or negative)
   * describes which way to turn to shrink the delta.
   *
   * From: https://math.stackexchange.com/questions/110080/shortest-way-to-achieve-target-angle
   */
  public static getDeltaAngle(src: Body, target: Victor) {
    const targetAngle = src.position.clone().subtract(target).norm().angle() - Math.PI;
    return ((targetAngle - src.yaw.angle() + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
  }

  /**
   * Given a source, target, and tolerance (to prevent constant jittering), return which direction (or
   * None) to turn towards.
   */
  public static getTurnDirection(
    src: Body,
    target: Victor,
    tolerance?: number
  ): Engine["direction"] {
    const angle = Body.getDeltaAngle(src, target);
    if (Math.abs(angle) < (tolerance ?? 0.05)) {
      return "None";
    }

    return angle > 0 ? "Left" : "Right";
  }

  /**
   * Which way to turn to get the body facing the opposite direction of its velocity.
   */
  public static getTurnDirectionForOpposite(src: Body): Engine["direction"] {
    const targetAngle = src.velocity.angle() + Math.PI;
    const targetPosition = new Victor(1, 0).multiplyScalar(1_000_000_000).rotate(targetAngle);
    return this.getTurnDirection(src, targetPosition);
  }

  /**
   * Return if a is facing b, within a tolerance in radians.
   * TODO: clean this up. Probably a better way to do it with vectors?
   */
  public static isFacing(a: Body, b: Victor, tolerance?: number): boolean {
    const isFacing = Math.abs(Body.getDeltaAngle(a, b)) < (tolerance ?? 0.05);
    return isFacing;
  }
}
