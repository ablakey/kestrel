import { useEffect } from "react";
import Victor from "victor";

export type ValueOf<T> = T[keyof T];

export type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };

/**
 * Allows the key of an obhject to be inferred but the value must be type U.
 */
export function asTypedObject<T>() {
  return function <Obj>(obj: { [K in keyof Obj]: T }) {
    return obj;
  };
}

export function assert<T>(val: T, message?: string): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(message ?? `Expected 'val' to be defined, but received ${val}`);
  }
}

/**
 * Stringify a full key with modifiers.
 * NOTE: Disabled for now. We don't support modifier keys. This is because when you hold down space,
 * then shift, then left go of space, it doesn't register keyup Space but keyup ShiftSpace.
 */
export function stringifyFullKey(e: KeyboardEvent): string {
  const code = e.code.replace("Key", "");
  return code;
  // return `${e.altKey ? "Alt" : ""}${e.ctrlKey ? "Ctrl" : ""}${e.shiftKey ? "Shift" : ""}${code}`;
}

export function useKeypress<T extends string>(keys: T[], action: (key: T) => void) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const keyWithModifier = stringifyFullKey(e);
      if ((keys as string[]).includes(keyWithModifier)) action(keyWithModifier as T);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}

export function pickRandom<T>(elements: T[]): T {
  return elements[Math.floor(Math.random() * elements.length)];
}

export function randomBetween(min: number, max: number): number {
  const delta = max - min;
  return Math.random() * delta + min;
}

export function getRandomPosition(position: Victor, maxDistance: number) {
  return position
    .clone()
    .add(
      new Victor(randomBetween(-maxDistance, maxDistance), randomBetween(-maxDistance, maxDistance))
    );
}

export function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

export function getAngle(a: Victor, b: Victor) {
  return Math.atan2(b.y - a.y, b.x - a.x);
}
