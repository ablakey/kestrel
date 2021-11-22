import { Panel } from "./Panel";

export function Target() {
  const targetId = window.ecs.query(["Player"])[0].components.Offensive!.target;

  const target = targetId !== null ? window.ecs.entities.get(targetId) : null;

  return <Panel style={{ height: 200 }}>{target?.id}</Panel>;
}
