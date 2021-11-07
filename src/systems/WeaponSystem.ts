import { ECS, Entity, System } from "../ecs";

const PRIMARY_WEAPON_DELAY_MS = 100;

export const WeaponSystem = (ecs: ECS): System => {
  function update(entity: Entity<"Armament" | "Body">) {
    const { armament, body } = entity.components;

    if (armament.primaryFire && armament.primaryCooldownUntil <= ecs.elapsed) {
      armament.primaryCooldownUntil = ecs.elapsed + PRIMARY_WEAPON_DELAY_MS;

      ecs.factories.BulletFactory.create({ origin: entity.components.body, bulletType: armament. });
    }
  }
  return { update, componentKinds: ["Armament", "Body"] };
};
