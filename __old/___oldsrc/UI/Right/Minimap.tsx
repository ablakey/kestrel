import { Panel } from "./Panel";

export function Minimap() {
  return (
    <Panel
      style={{
        height: 250,
      }}
    >
      <div style={{ width: "100%", height: "100%" }} id="minimap" />
    </Panel>
  );
}
