import { Entity, System } from "../game";

export const StatsSystem = (): System => {
  function update(entity: Entity<"Health">) {
    const { health, player } = entity.components;

    /**
     * Apply damage.
     */
    while (health.effects.length) {
      const effect = health.effects.pop()!;
      health.hp -= effect.damage;
    }

    /**
     * Is destroyed?
     */
    if (health.hp <= 0 && !player) {
      console.info(`Ship ${entity.id} destroyed.`);
      entity.destroyed = true;
    }
  }

  return { update, componentKinds: ["Health"] };
};
