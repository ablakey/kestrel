import { ECS } from "../../ecs";
import { Tag } from "../../enum";
import { Panel } from "./Panel";

export function Stats(props: { ecs: ECS }) {
  const player = props.ecs.query(["Body"], [Tag.Player])[0];
  return (
    <Panel>
      <div>{`${props.ecs.entities.size} entites`}</div>
      <div>{`${player.components.body.vel.magnitude().toFixed(0)} m/s`}</div>
    </Panel>
  );
}
