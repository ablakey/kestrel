import { ECS } from "../ecs";
import { Overlay } from "./Overlay";
import { Right } from "./Right";

/**
 * UiRoot is forcibly updated and provides the entire ECS state.
 * It will be passed down to major components, but then for lesser components, a normalized state is provided.
 */
export function UiRoot(props: { ecs: ECS }) {
  return (
    <>
      <Overlay ecs={props.ecs} />
      <Right ecs={props.ecs} />
    </>
  );
}
