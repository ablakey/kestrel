import { Panel } from "./Panel";

export function Info() {
  const player = window.ecs.query(["Player"])[0];

  return (
    <Panel>
      <div>{`${window.ecs.entities.size} entites`}</div>
      <div>{`${player.components.Body!.velocity.magnitude().toFixed(0)} m/s`}</div>
    </Panel>
  );
}
