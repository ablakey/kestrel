import Victor from "victor";
import { Game, Entity, System } from "../game";
import { Weapons } from "../Items/Weapons";

export const CombatSystem = (game: Game): System => {
  function update(entity: Entity<"Offensive" | "Body" | "Inventory">) {
    const { offensive, body, inventory } = entity.components;

    inventory.weapons.forEach((w) => {
      const weaponType = Weapons[w.name];

      const isFiring = weaponType.type === "Primary" ? offensive.primaryFire : false; // TODO secondary.
      const fireDelay = 1000 / (weaponType.fireRate * w.count); // delay between shots in ms.

      if (!isFiring || w.lastUsed + fireDelay > game.elapsed) {
        return;
      }

      const bulletPos = body.position
        .clone()
        .add(new Victor(offensive.bulletOffset, 0).rotate(body.yaw.angle()));

      game.bulletFactory.create({
        x: bulletPos.x,
        y: bulletPos.y,
        yaw: body.yaw.angle() + Math.random() * (1 - weaponType.accuracy),
        weaponName: w.name,
      });

      w.lastUsed = game.elapsed;
    });
  }
  return { update, componentKinds: ["Offensive", "Body", "Inventory"] };
};
