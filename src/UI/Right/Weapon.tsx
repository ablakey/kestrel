import { secondaryWeaponDefinitions } from "../../definitions/weapons";
import { useEngine } from "../../main";
import { Panel } from "./Panel";

export function Weapon() {
  const engine = useEngine();
  const weaponName = engine.entities.playerShip.selectedSecondary;
  const weaponString = weaponName
    ? secondaryWeaponDefinitions[weaponName].label
    : "No Weapon Selected";

  return (
    <Panel style={{ display: "flex", flexDirection: "column", padding: 4 }}>{weaponString}</Panel>
  );
}
