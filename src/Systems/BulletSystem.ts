import { ECS, Entity, System } from "../ecs";

export const BulletSystem = (ecs: ECS): System => {
  function update(entity: Entity<"Damage" | "Body">) {
    /**
     * Detect collisions.
     */
    ecs.query(["Body", "Health"]).forEach((e) => {
      const distance = entity.components.Body.position.distance(e.components.Body.position);
      if (distance < 50) {
        entity.destroyed = true;
        e.components.Health.effects.push({ damage: entity.components.Damage.damage });
      }
    });
  }

  return { update, componentKinds: ["Damage", "Body"] };
};
