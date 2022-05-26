import Victor from "victor";
import { WeaponName } from "../items";
import { weaponDefinitions } from "../items/weapons";
import { Bullet } from "../types/Bullet";
import { Ship } from "../types/Ship";
import { randomBetween } from "../utils";
import { System } from "./System";

export class CombatSystem extends System {
  private fireWeapon(ship: Ship, weaponName: WeaponName) {
    const weaponType = weaponDefinitions[weaponName];

    const position = ship.position
      .clone()
      .add(new Victor(ship.definition.radius, 0).rotate(ship.yaw.angle()));

    const weaponError = 1 - weaponType.accuracy;
    const yaw = ship.yaw.clone().rotateBy(randomBetween(-weaponError, weaponError));

    this.engine.entities.addBullet(new Bullet({ position, yaw, target: ship.target }));
    this.engine.soundFactory.playSound(weaponType.sound, { position: ship.position });
  }

  update(ship: Ship) {
    /**
     * Fire all primary weapons not on cooldown. If ship has multiple primary weapons, reduce
     * the cooldown.
     */
    if (ship.firePrimary) {
      ship.primaryWeapons.forEach((w) => {
        const weaponType = weaponDefinitions[w.name];
        if (!w.cooldown) {
          this.fireWeapon(ship, w.name);
          w.cooldown = weaponType.cooldown;
        }
      });
    }

    /**
     * Fire secondary weapon, decrementing ammo count.
     *
     * TODO: some secondary weapons might not have an ammo count.
     */
    // if (offensive.fireSecondary && offensive.selectedSecondary) {
    //   const secondaryInstance = ship.getSelectedSecondary();

    //   // It's selected but doesn't actually exist in inventory.
    //   if (!secondaryInstance) {
    //     offensive.selectedSecondary = null;
    //   } else {
    //     const weaponType = Weapons[offensive.selectedSecondary];
    //     const ammoInstance = Inventory.getSelectedAmmo(entity);
    //     const cooldown = 1000 / (weaponType.fireRate * secondaryInstance.count);
    //     if (secondaryInstance.lastUsed + cooldown < game.elapsed && ammoInstance?.count) {
    //       this.fireWeapon(body, offensive, offensive.selectedSecondary);
    //       secondaryInstance.lastUsed = game.elapsed;
    //       ammoInstance.count -= 1;
    //     }
    //   }
    // }
  }
}
