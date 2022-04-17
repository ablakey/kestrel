import { Entity } from "../game";
import { AmmoInstance, WeaponInstance } from "../Inventory";
import { WeaponName, Weapons } from "../Inventory/Weapons";

export interface Inventory {
  kind: "Inventory";
  weapons: WeaponInstance[];
  ammos: AmmoInstance[];
}

export class Inventory {
  /**
   * Return this entity's selected secondary weapon.
   */
  public static getSelectedSecondary(
    entity: Entity<"Inventory" | "Offensive">
  ): WeaponInstance | null {
    const selected = entity.components.offensive.selectedSecondary;
    return entity.components.inventory.weapons.find((w) => w.name === selected) ?? null;
  }

  public static getSelectedAmmo(entity: Entity<"Inventory" | "Offensive">): AmmoInstance | null {
    const selectedSecondary = entity.components.offensive.selectedSecondary;

    if (selectedSecondary === null) {
      return null;
    }

    const weaponType = Weapons[selectedSecondary];
    return entity.components.inventory.ammos.find((a) => a.name === weaponType.ammo) ?? null;
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
