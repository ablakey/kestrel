import Victor from "victor";
import { Game, Entity, System } from "../game";
import { Weapons } from "../Items/Weapons";

export const CombatSystem = (game: Game): System => {
  function update(entity: Entity<"Offensive" | "Body" | "Inventory">) {
    const { offensive, body, inventory } = entity.components;

    inventory.weapons.forEach((w) => {
      const weaponType = Weapons[w.name];
      const fireDelay = 1000 / (weaponType.fireRate * w.count); // delay between shots in ms.

      const isFiring =
        weaponType.type == "Primary" ? offensive.firePrimary : offensive.fireSecondary;

      // console.log({ isFiring, name: w.name });

      if (!isFiring || w.lastUsed + fireDelay > game.elapsed) {
        return;
      }

      const position = body.position
        .clone()
        .add(new Victor(offensive.bulletOffset, 0).rotate(body.yaw.angle()));

      const yaw = body.yaw.angle() + Math.random() * (1 - weaponType.accuracy);

      game.bulletFactory.create(position, yaw, w.name, offensive.target ?? undefined);

      w.lastUsed = game.elapsed;
    });
  }
  return { update, componentKinds: ["Offensive", "Body", "Inventory"] };
};
