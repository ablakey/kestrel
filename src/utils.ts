import React, { useContext, useEffect } from "react";
import { Game } from "./game";

export const GameContext = React.createContext(undefined as unknown as Game); // TODO: a better default.

export function assert<T>(val: T, message?: string): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(message ?? `Expected 'val' to be defined, but received ${val}`);
  }
}

export function useGame() {
  return useContext(GameContext);
}

export function stringifyFullKey(e: KeyboardEvent): string {
  const code = e.code.replace("Key", "");
  return `${e.altKey ? "Alt" : ""}${e.ctrlKey ? "Ctrl" : ""}${e.shiftKey ? "Shift" : ""}${code}`;
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
