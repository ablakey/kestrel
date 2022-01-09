import { Entity } from "../game";
import { AmmosInstance, WeaponInstance } from "../Items";
import { WeaponName, Weapons } from "../Items/Weapons";

export interface Inventory {
  kind: "Inventory";
  weapons: WeaponInstance[];
  ammos: AmmosInstance[];
}

export class Inventory {
  public static getAmmo(entity: Entity<"Inventory">, weaponName: WeaponName): AmmosInstance | null {
    return null;
  }

  /**
   * Cycle forwards through secondary weapons.
   */
  public static getNextSecondaryWeapon(
    entity: Entity<"Inventory">,
    currentWeapon: WeaponName | null
  ): WeaponName | null {
    const { inventory } = entity.components;

    const secondaryWeapons = inventory.weapons.filter((w) => Weapons[w.name].type === "Secondary");

    if (secondaryWeapons.length === 0) {
      return null;
    }

    if (currentWeapon === null) {
      return secondaryWeapons[0].name;
    }

    const currentIndex = secondaryWeapons.findIndex((w) => w.name === currentWeapon);

    if (currentIndex === -1) {
      return null;
    }

    return secondaryWeapons.at((currentIndex + 1) % secondaryWeapons.length)!.name;
  }
}
