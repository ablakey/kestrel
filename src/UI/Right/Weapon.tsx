import { WeaponInstance } from "../../Items";
import { Panel } from "./Panel";

export function Weapon(props: { instance: WeaponInstance | undefined }) {
  const { instance } = props;

  const weaponString = instance ? `${instance.name} (${instance.count})` : "No Weapon Selected";

  return (
    <Panel style={{ display: "flex", flexDirection: "column", padding: 4 }}>{weaponString}</Panel>
  );
}
