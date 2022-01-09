import { AmmosInstance, WeaponInstance } from "../../Items";
import { Panel } from "./Panel";

export function Weapon(props: {
  weaponInstance: WeaponInstance | null;
  ammoInstance: AmmosInstance | null;
}) {
  const { weaponInstance, ammoInstance } = props;

  const weaponString = weaponInstance
    ? `${weaponInstance.name} (${ammoInstance?.count ?? 0})`
    : "No Weapon Selected";

  return (
    <Panel style={{ display: "flex", flexDirection: "column", padding: 4 }}>{weaponString}</Panel>
  );
}
