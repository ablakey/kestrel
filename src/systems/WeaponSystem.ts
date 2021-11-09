import Victor from "victor";
import { ECS, Entity, System } from "../ecs";

const PRIMARY_WEAPON_DELAY_MS = 100;

export const WeaponSystem = (ecs: ECS): System => {
  function update(entity: Entity<"Offensive" | "Body">) {
    const { offensive } = entity.components;

    if (offensive.primaryFire && offensive.primaryCooldownUntil <= ecs.elapsed) {
      offensive.primaryCooldownUntil = ecs.elapsed + PRIMARY_WEAPON_DELAY_MS;

      /**
       * Offset the bullet's position by an amount in front of the weapon origin based on the
       * origin's radius.
       */

      // const offset = entity.components.

      const bulletPos = entity.components.body.pos
        .clone()
        .add(new Victor(200, 0).rotate(entity.components.body.yaw));

      ecs.factories.BulletFactory.create({
        x: bulletPos.x,
        y: bulletPos.y,
        yaw: entity.components.body.yaw,
        weaponName: "LaserCannon",
      });
    }
  }
  return { update, componentKinds: ["Offensive", "Body"] };
};
