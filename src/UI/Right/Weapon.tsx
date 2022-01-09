import { AmmosInstance } from "../../Items";
import { Ammos } from "../../Items/Ammos";
import { Panel } from "./Panel";

export function Weapon(props: { ammoInstance: AmmosInstance | null }) {
  const { ammoInstance } = props;

  const weaponString = ammoInstance
    ? `${Ammos[ammoInstance.name].label}s: ${ammoInstance?.count ?? 0}`
    : "No Weapon Selected";

  return (
    <Panel style={{ display: "flex", flexDirection: "column", padding: 4 }}>{weaponString}</Panel>
  );
}
