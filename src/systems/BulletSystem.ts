import { Bullet } from "../components";
import { ECS, Entity, System } from "../ecs";

export const BulletSystem = (ecs: ECS): System<Bullet> => {
  function update(entity: Entity<Bullet>) {
    /**
     * Remove old bullets.
     */
    if (ecs.elapsed > entity.spawnTime + entity.components.bullet.lifespan) {
      entity.destroyed = true;
    }

    /**
     * Detect collisions.
     */
    // TODO
  }

  return { update, componentKinds: ["Bullet"] };
};
