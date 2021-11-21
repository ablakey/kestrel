import Victor from "victor";
import { ECS, Entity, System } from "../ecs";

const PRIMARY_WEAPON_DELAY_MS = 100;

export const CombatSystem = (ecs: ECS): System => {
  function update(entity: Entity<"Offensive" | "Body" | "Inventory">) {
    const { Offensive, Body, Inventory } = entity.components;

    if (Offensive.primaryFire && Offensive.primaryCooldownUntil <= ecs.elapsed) {
      Offensive.primaryCooldownUntil = ecs.elapsed + PRIMARY_WEAPON_DELAY_MS;

      const bulletPos = Body.position
        .clone()
        .add(new Victor(entity.components.Offensive.bulletOffset, 0).rotate(Body.yaw.angle()));

      ecs.factories.BulletFactory.create({
        x: bulletPos.x,
        y: bulletPos.y,
        yaw: Body.yaw.angle(),
        weaponName: Inventory.weapons[0].name,
      });
    }
  }
  return { update, componentKinds: ["Offensive", "Body", "Inventory"] };
};
