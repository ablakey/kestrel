import { Entity } from "../../ecs";
import { Panel } from "./Panel";

export function Target(props: { target: Entity | null }) {
  return <Panel style={{ height: 200 }}>{props.target?.id}</Panel>;
}
