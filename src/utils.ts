export function assert<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`);
  }
}

import React, { useContext, useEffect } from "react";
import { Game } from "./game";

export const GameContext = React.createContext(undefined as unknown as Game); // TODO: a better default.

export function useGame() {
  return useContext(GameContext);
}

export function stringifyFullKey(e: KeyboardEvent): string {
  return `${e.altKey ? "Alt" : ""}${e.ctrlKey ? "Ctrl" : ""}${
    e.shiftKey ? "Shift" : ""
  }${e.key.toUpperCase()}`;
}

export default function useKeypress<T extends string>(keys: T[], action: (key: T) => void) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const keyWithModifier = stringifyFullKey(e);
      if ((keys as string[]).includes(keyWithModifier)) action(keyWithModifier as T);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
