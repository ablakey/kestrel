import { Condition } from "../enum";
import { Entity, Game, System } from "../game";

export const StatsSystem = (game: Game): System => {
  function update(entity: Entity<"Health" | "Body">, delta: number) {
    const { health, player, body } = entity.components;

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

    if (health.condition === Condition.Destroying && Math.random() < 0.05) {
      game.doodadFactory.createExplosion({
        position: body.position.clone(),
        size: "SmallExplosion",
      });
    }

    if (health.timeToLive !== null && health.timeToLive <= 0) {
      game.doodadFactory.createExplosion({ position: body.position.clone(), size: "Explosion" });
      entity.destroyed = true;
    }
  }

  return { update, componentKinds: ["Health", "Body"] };
};
