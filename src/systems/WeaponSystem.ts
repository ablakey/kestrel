import { ECS, Entity, System } from "../ecs";

const PRIMARY_WEAPON_DELAY_MS = 100;

export const WeaponSystem = (ecs: ECS): System => {
  function update(entity: Entity<"Combat" | "Body">) {
    const { combat } = entity.components;

    if (combat.primaryFire && combat.primaryCooldownUntil <= ecs.elapsed) {
      combat.primaryCooldownUntil = ecs.elapsed + PRIMARY_WEAPON_DELAY_MS;

      // TODO: get weapon name from the component.
      ecs.factories.BulletFactory.create({
        origin: entity.components.body,
        weaponName: "LaserCannon",
      });
    }
  }
  return { update, componentKinds: ["Combat", "Body"] };
};
