import { Entity, System } from "../ecs";

export const StatsSystem = (): System => {
  function update(entity: Entity<"Health">) {
    const { health } = entity.components;

    /**
     * Apply damage.
     */
    while (health.effects.length) {
      const effect = health.effects.pop()!;
      health.hp -= effect.damage;
    }

    /**
     * Is ship destroyed?
     */
    if (health.hp <= 0) {
      entity.destroyed = true;
    }
  }

  return { update, componentKinds: ["Health"] };
};
