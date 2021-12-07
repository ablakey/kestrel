import { Panel } from "./Panel";

export function Stats(props: { hp: number }) {
  return (
    <Panel style={{ display: "flex", flexDirection: "column", padding: 4 }}>
      <progress style={{ width: "100%" }} max={100} value={props.hp}></progress>
      <progress style={{ width: "100%" }} max={100} value={70}></progress>
      <progress style={{ width: "100%" }} max={100} value={70}></progress>
    </Panel>
  );
}
