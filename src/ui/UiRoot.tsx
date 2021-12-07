import { Game } from "../game";
import { DebugModal } from "./DebugModal";
import { Overlay } from "./Overlay";
import { Right } from "./Right";

/**
 * UiRoot is forcibly updated and provides the entire Game state.
 * It will be passed down to major components, but then for lesser components, a normalized state is provided.
 */
export function UiRoot(props: { game: Game }) {
  return (
    <>
      <Overlay game={props.game} />
      <Right game={props.game} />
      <DebugModal />
    </>
  );
}
