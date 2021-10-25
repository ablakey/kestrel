import ReactDOM from "react-dom";
import { initialGameState } from "./GameState";
import { createGame } from "./phaser";
import { RightPanel } from "./ui/RightPanel";
import { createStore } from "./utils";

function main() {
  /**
   * We're experimenting with just making store a global, given there's one and it has a persistent lifecycle. We're
   * also not sharing this code with others as a library so no big deal. It beats having to make sure everything
   * everywhere has access to the store.
   *
   * Remember that the store is really only needed for major game state.  Ie. we're not keeping entity positions and
   * such as globals. Mostly just things that we want to use to drive the UI, such as inventory, ship state, etc.
   */
  window.store = createStore(initialGameState);

  /**
   * No idea if we need this as a global for later but it might help with debugging.
   */
  window.game = createGame();

  /**
   * The RightPanel will subscribe to store and update itself and maybe children when store changes.
   */
  ReactDOM.render(<RightPanel store={window.store} />, document.querySelector("#right"));
}

window.onload = main;
