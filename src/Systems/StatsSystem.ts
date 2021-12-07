import { Entity, System } from "../game";

export const StatsSystem = (): System => {
  function update(entity: Entity<"Health">) {
    const { Health, Player } = entity.components;

    /**
     * Apply damage.
     */
    while (Health.effects.length) {
      const effect = Health.effects.pop()!;
      Health.hp -= effect.damage;
    }

    /**
     * Is destroyed?
     */
    if (Health.hp <= 0 && !Player) {
      entity.destroyed = true;
    }
  }

  return { update, componentKinds: ["Health"] };
};
