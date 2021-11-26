import Victor from "victor";
import { ECS, Entity, System } from "../ecs";
import { Weapons } from "../Items/Weapons";

export const CombatSystem = (ecs: ECS): System => {
  function update(entity: Entity<"Offensive" | "Body" | "Inventory">) {
    const { Offensive, Body, Inventory } = entity.components;

    /**
     * Primary fire.
     *
     */
    if (Offensive.primaryFire && Offensive.primaryCooldownUntil <= ecs.elapsed) {
      const weapon = Inventory.weapons[0];
      const weaponType = Weapons[weapon.name];

      Offensive.primaryCooldownUntil = ecs.elapsed + 1000 / weaponType.fireRate;

      const bulletPos = Body.position
        .clone()
        .add(new Victor(entity.components.Offensive.bulletOffset, 0).rotate(Body.yaw.angle()));

      ecs.utilities.BulletFactory.create({
        x: bulletPos.x,
        y: bulletPos.y,
        yaw: Body.yaw.angle(),
        weaponName: weapon.name,
      });
    }
  }
  return { update, componentKinds: ["Offensive", "Body", "Inventory"] };
};
