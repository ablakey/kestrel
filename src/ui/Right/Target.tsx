import { Entity } from "../../ecs";
import { Ships } from "../../Items/Ships";
import { Panel } from "./Panel";

export function Target(props: { target: Entity | null }) {
  const { target } = props;

  if (target === null) {
    return "No Target Selected.";
  }

  // const shipType = Ships[props.tar];

  return target.id;
}
