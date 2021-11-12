import { Body } from "./components";
import { Direction } from "./enum";

const TAU = Math.PI * 2;

export function normAngle(angle: number) {
  return (angle + TAU) % TAU;
}

export function getDeltaAngle(a: Body, b: Body) {
  const absAngle = a.position.clone().subtract(b.position).norm().angle();
  return absAngle - a.yaw.clone().invert().angle();
}

export function getTurnDirection(src: Body, target: Body, tolerance: number): Direction {
  const angle = getDeltaAngle(src, target);
  console.log(angle);
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
