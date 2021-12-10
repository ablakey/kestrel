import React from "react";
import { Game } from "../game";
import { GameContext } from "../utils";
import { DebugModal } from "./DebugModal";
import { Overlay } from "./Overlay";
import { Right } from "./Right";

/**
 * UiRoot is forcibly updated and provides the entire Game state.
 * It will be passed down to major components, but then for lesser components, a normalized state is provided.
 */
export function Layout(props: { game: Game }) {
  return (
    <>
      <GameContext.Provider value={props.game}>
        <Overlay />
        <Right />
        {props.game.state.showDebug && <DebugModal />}
      </GameContext.Provider>
    </>
  );
}
