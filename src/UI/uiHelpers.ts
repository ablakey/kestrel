import React, { useContext } from "react";
import { Game } from "../game";

export const GameContext = React.createContext(undefined as unknown as Game); // TODO: a better default.

export function useGame() {
  return useContext(GameContext);
}
