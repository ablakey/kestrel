import { Stats } from "../components";
import { ECS, Entity, System } from "../ecs";

export const StatsSystem = (ecs: ECS): System<Stats> => {
  function update(entity: Entity<Stats>) {
    const { stats } = entity.components;

    /**
     * Apply damage.
     */
    while (stats.damageEffects.length) {
      const effect = stats.damageEffects.pop()!;
      stats.health -= effect.damage;
    }

    /**
     * Is ship destroyed?
     */
    if (stats.health <= 0) {
      entity.destroyed = true;
    }
  }

  return { update, componentKinds: ["Stats"] };
};
