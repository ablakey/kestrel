import { ECS, Entity, System } from "../ecs";
import { Tag } from "../enum";

export const BulletSystem = (ecs: ECS): System => {
  function update(entity: Entity<"Bullet" | "Body">) {
    /**
     * Remove old bullets.
     */
    if (ecs.elapsed > entity.spawnTime + entity.components.bullet.lifespan) {
      entity.destroyed = true;
    }

    /**
     * Detect collisions.
     */
    ecs.query(["Body", "Stats"], [Tag.Enemy]).forEach((e) => {
      const distance = entity.components.body.pos.distance(e.components.body.pos);
      if (distance < 50) {
        entity.destroyed = true;
        e.components.stats.damageEffects.push({ damage: 10 });
      }
    });
  }

  return { update, componentKinds: ["Bullet", "Body"] };
};
