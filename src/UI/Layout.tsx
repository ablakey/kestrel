import { Overlay } from "./Overlay";
import { Right } from "./Right";

/**
 * UiRoot is forcibly updated and provides the entire Game state.
 * It will be passed down to major components, but then for lesser components, a normalized state is provided.
 */
export function Layout() {
  return (
    <>
      <Overlay />
      <Right />
    </>
  );
}
