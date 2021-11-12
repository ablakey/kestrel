import { Body } from "./components";

const TAU = Math.PI * 2;

export function normAngle(angle: number) {
  return (angle + TAU) % TAU;
}

export function getDeltaAngle(a: Body, b: Body) {
  const absAngle = a.position.clone().subtract(b.position).norm().angle();
  return absAngle - a.yaw.clone().invert().angle();
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
