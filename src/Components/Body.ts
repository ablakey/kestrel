import Victor from "victor";
import { Direction } from "../enum";

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
  public static getDeltaAngle(src: Body, target: Body) {
    const targetAngle = src.position.clone().subtract(target.position).norm().angle() - Math.PI;
    return ((targetAngle - src.yaw.angle() + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
  }

  /**
   * Given a source, target, and tolerance (to prevent constant jittering), return which direction (or
   * None) to turn towards.
   */
  public static getTurnDirection(src: Body, target: Body, tolerance: number): Direction {
    const angle = Body.getDeltaAngle(src, target);
    if (Math.abs(angle) < tolerance) {
      return Direction.None;
    }

    return angle > 0 ? Direction.Left : Direction.Right;
  }

  /**
   * Return if a is facing b, within a tolerance in radians.
   * TODO: clean this up. Probably a better way to do it with vectors?
   */
  public static isFacing(a: Body, b: Body, tolerance: number): boolean {
    const isFacing = Math.abs(Body.getDeltaAngle(a, b)) < tolerance;
    return isFacing;
  }
}
