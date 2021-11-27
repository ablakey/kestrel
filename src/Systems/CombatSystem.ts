import Victor from "victor";
import { ECS, Entity, System } from "../ecs";
import { Weapons } from "../Items/Weapons";

export const CombatSystem = (ecs: ECS): System => {
  function update(entity: Entity<"Offensive" | "Body" | "Inventory">) {
    const { Offensive, Body, Inventory } = entity.components;

    Inventory.weapons.forEach((w) => {
      const weaponType = Weapons[w.name];

      const isFiring = weaponType.type === "Primary" ? Offensive.primaryFire : false; // TODO secondary.
      const fireDelay = 1000 / (weaponType.fireRate * w.count); // delay between shots in ms.

      if (!isFiring || w.lastUsed + fireDelay > ecs.elapsed) {
        return;
      }

      const bulletPos = Body.position
        .clone()
        .add(new Victor(entity.components.Offensive.bulletOffset, 0).rotate(Body.yaw.angle()));

      ecs.utilities.BulletFactory.create({
        x: bulletPos.x,
        y: bulletPos.y,
        yaw: Body.yaw.angle() + Math.random() * (1 - weaponType.accuracy),
        weaponName: w.name,
      });

      w.lastUsed = ecs.elapsed;
    });
  }
  return { update, componentKinds: ["Offensive", "Body", "Inventory"] };
};
