import Victor from "victor";
import { Body, Offensive } from "../Components";
import { Entity, Game, System } from "../game";
import { Weapon, Weapons } from "../Items/Weapons";
import { randomSign } from "../utils";

export const CombatSystem = (game: Game): System => {
  function fireWeapon(body: Body, offensive: Offensive, weaponType: Weapon) {
    const position = body.position
      .clone()
      .add(new Victor(offensive.bulletOffset, 0).rotate(body.yaw.angle()));

    const yaw = body.yaw.angle() + Math.random() * randomSign(1 - weaponType.accuracy);
    game.bulletFactory.create(position, yaw, weaponType, offensive.target ?? undefined);
    game.soundFactory.playSound(weaponType.sound, { position: body.position });
  }

  function update(entity: Entity<"Offensive" | "Body" | "Inventory">) {
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
            fireWeapon(body, offensive, weaponType);
            w.lastUsed = game.elapsed;
          }
        });
    }

    /**
     * Fire secondary weapon, decrementing ammo count.
     *
     * TODO: some secondary weapons might not have an ammo count.a
     */
    if (offensive.fireSecondary && offensive.selectedSecondary) {
      const secondaryInstance = inventory.weapons.find(
        (w) => w.name === offensive.selectedSecondary
      );

      // It's selected but doesn't actually exist in inventory.
      if (!secondaryInstance) {
        offensive.selectedSecondary = null;
      } else {
        const weaponType = Weapons[offensive.selectedSecondary];
        const ammoInstance = inventory.ammos.find((a) => a.name === weaponType.ammo);
        const cooldown = 1000 / (weaponType.fireRate * secondaryInstance.count);
        if (secondaryInstance.lastUsed + cooldown < game.elapsed && ammoInstance?.count) {
          fireWeapon(body, offensive, weaponType);
          secondaryInstance.lastUsed = game.elapsed;
          secondaryInstance.count -= 1;
        }
      }
    }
  }
  return { update, componentKinds: ["Offensive", "Body", "Inventory"] };
};
