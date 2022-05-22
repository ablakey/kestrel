import { Ship } from "../types/Ship";
import { System } from "./System";

export class CombatSystem extends System {
  private fireWeapon(body: Body, offensive: Offensive, weaponName: WeaponName) {
    const weaponType = Weapons[weaponName];
    const position = body.position
      .clone()
      .add(new Victor(offensive.bulletOffset, 0).rotate(body.yaw.angle()));

    const weaponError = 1 - weaponType.accuracy;
    const yaw = body.yaw.angle() + randomBetween(-weaponError, weaponError);

    game.bulletFactory.create(position, yaw, weaponName, offensive.target ?? undefined);
    game.soundFactory.playSound(weaponType.sound, { position: body.position });
  }

  update(ship: Ship) {
    const { offensive, body, inventory } = entity.components;

    /**
     * Fire all primary weapons not on cooldown. If ship has multiple primary weapons, reduce
     * the cooldown.
     */
    if (offensive.firePrimary) {
      inventory.weapons
        .filter((w) => Weapons[w.name].type === "Primary")
        .forEach((w) => {
          const weaponType = Weapons[w.name];
          const cooldown = 1000 / (weaponType.fireRate * w.count);
          if (w.lastUsed + cooldown < game.elapsed) {
            fireWeapon(body, offensive, w.name);
            w.lastUsed = game.elapsed;
          }
        });
    }

    /**
     * Fire secondary weapon, decrementing ammo count.
     *
     * TODO: some secondary weapons might not have an ammo count.
     */
    if (offensive.fireSecondary && offensive.selectedSecondary) {
      const secondaryInstance = ship.getSelectedSecondary();

      // It's selected but doesn't actually exist in inventory.
      if (!secondaryInstance) {
        offensive.selectedSecondary = null;
      } else {
        const weaponType = Weapons[offensive.selectedSecondary];
        const ammoInstance = Inventory.getSelectedAmmo(entity);
        const cooldown = 1000 / (weaponType.fireRate * secondaryInstance.count);
        if (secondaryInstance.lastUsed + cooldown < game.elapsed && ammoInstance?.count) {
          fireWeapon(body, offensive, offensive.selectedSecondary);
          secondaryInstance.lastUsed = game.elapsed;
          ammoInstance.count -= 1;
        }
      }
    }
  }
}
