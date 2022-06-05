import { Panel } from "./Panel";

export function Weapon() {
  const weaponString = "No Weapon Selected";

  return (
    <Panel style={{ display: "flex", flexDirection: "column", padding: 4 }}>{weaponString}</Panel>
  );
}
