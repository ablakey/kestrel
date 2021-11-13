import { Body } from "./components";
import { Direction } from "./enum";

const TAU = Math.PI * 2;

export function normAngle(angle: number) {
  return (angle + TAU) % TAU;
}

/**
 * Get the angle in radians between a source and a target.
 * This is how far the source has to rotate to point at the target.  The sign (positive or negative)
 * describes which way to turn to shrink the delta.
 *
 * From: https://math.stackexchange.com/questions/110080/shortest-way-to-achieve-target-angle
 */
export function getDeltaAngle(src: Body, target: Body) {
  const targetAngle = src.position.clone().subtract(target.position).norm().angle() - Math.PI;
  return ((targetAngle - src.yaw.angle() + Math.PI * 3) % TAU) - Math.PI;
}

/**
 * Given a source, target, and tolerance (to prevent constant jittering), return which direction (or
 * None) to turn towards.
 */
export function getTurnDirection(src: Body, target: Body, tolerance: number): Direction {
  const angle = getDeltaAngle(src, target);
  if (Math.abs(angle) < tolerance) {
    return Direction.None;
  }

  return angle > 0 ? Direction.Left : Direction.Right;
}

/**
 * Return if a is facing b, within a tolerance in radians.
 * TODO: clean this up. Probably a better way to do it with vectors?
 */
export function isFacing(a: Body, b: Body, tolerance: number): boolean {
  const isFacing = Math.abs(getDeltaAngle(a, b)) < tolerance;
  return isFacing;
}

export function assert<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`);
  }
}
