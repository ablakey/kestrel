import Victor from "victor";
import { ECS, Entity, System } from "../ecs";

const PRIMARY_WEAPON_DELAY_MS = 100;

export const CombatSystem = (ecs: ECS): System => {
  function update(entity: Entity<"Offensive" | "Body">) {
    const { offensive } = entity.components;

    if (offensive.primaryFire && offensive.primaryCooldownUntil <= ecs.elapsed) {
      offensive.primaryCooldownUntil = ecs.elapsed + PRIMARY_WEAPON_DELAY_MS;

      const bulletPos = entity.components.body.position
        .clone()
        .add(
          new Victor(entity.components.offensive.bulletOffset, 0).rotate(
            entity.components.body.yaw.angle()
          )
        );

      ecs.factories.BulletFactory.create({
        x: bulletPos.x,
        y: bulletPos.y,
        yaw: entity.components.body.yaw.angle(),
        weaponName: "LaserCannon",
      });
    }
  }
  return { update, componentKinds: ["Offensive", "Body"] };
};
