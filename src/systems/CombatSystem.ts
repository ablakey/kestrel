import Victor from "victor";
import { WeaponName } from "../definitions";
import { weaponDefinitions } from "../definitions/weapons";
import { Bullet } from "../entities/Bullet";
import { Ship } from "../entities/Ship";
import { randomBetween } from "../utils";
import { System } from "./System";

export class CombatSystem extends System {
  update() {
    this.engine.entities.ships.forEach(this.updateOne);
  }

  private fireWeapon(ship: Ship, weaponName: WeaponName) {
    const weaponType = weaponDefinitions[weaponName];

    const position = ship.position
      .clone()
      .add(new Victor(ship.definition.radius, 0).rotate(ship.yaw.angle()));

    const weaponError = 1 - weaponType.accuracy;
    const yaw = ship.yaw.clone().rotate(randomBetween(-weaponError, weaponError));

    this.engine.entities.addBullet(new Bullet({ position, yaw, target: ship.target, weaponName }));
    this.engine.soundFactory.playSound(weaponType.sound, { position: ship.position });
  }

  private updateOne(ship: Ship) {
    /**
     * Fire all primary weapons not on cooldown. If ship has multiple primary weapons, reduce
     * the cooldown.
     */
    if (ship.firePrimary) {
      ship.primaryWeapons.forEach((w) => {
        const weaponType = weaponDefinitions[w.name];
        if (!ship.cooldowns.get(w.name)) {
          this.fireWeapon(ship, w.name);
          ship.cooldowns.set(w.name, weaponType.cooldown / w.count);
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
