import { Condition } from "../enum";
import { Entity, System } from "../game";

export const StatsSystem = (): System => {
  function update(entity: Entity<"Health">, delta: number) {
    const { health, player } = entity.components;

    /**
     * Apply damage.
     */
    while (health.effects.length) {
      const effect = health.effects.pop()!;
      health.hp -= effect.damage;
    }

    /**
     * Is destroying?
     */
    if (health.hp <= 0 && !player && health.condition === Condition.Alive) {
      console.info(`Ship ${entity.id} is breaking up.`);
      health.condition = Condition.Destroying;
      health.timeToLive = 3000;
    }

    if (health.timeToLive) {
      health.timeToLive -= delta;
    }

    if (health.timeToLive !== null && health.timeToLive <= 0) {
      entity.destroyed = true;
    }
  }

  return { update, componentKinds: ["Health"] };
};
