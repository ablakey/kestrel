import { ECS } from "../ecs";
import { Overlay } from "./Overlay";
import { Right } from "./Right";

export function UiRoot(props: { ecs: ECS }) {
  return (
    <>
      <Overlay />
      <Right ecs={props.ecs} />
    </>
  );
}
