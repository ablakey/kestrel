import { Armament, Body } from "../components";
import { ECS, Entity, System } from "../ecs";

const PRIMARY_WEAPON_DELAY_MS = 100;

export const WeaponSystem = (ecs: ECS): System<Armament | Body> => {
  function update(entity: Entity<Armament | Body>) {
    const { armament, body } = entity.components;

    if (armament.primaryFire && armament.primaryCooldownUntil <= ecs.elapsed) {
      armament.primaryCooldownUntil = ecs.elapsed + PRIMARY_WEAPON_DELAY_MS;

      ecs.factories.BulletFactory.create(body.pos.clone(), body.yaw);
    }
  }
  return { update, componentKinds: ["Armament", "Body"] };
};
