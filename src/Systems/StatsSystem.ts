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
      game.doodadFactory.spawnSprite(body.position.clone(), "SmallExplosion");
      game.soundFactory.playSound("ShipBreaksUp");
    }

    if (health.timeToLive !== null && health.timeToLive <= 0) {
      game.doodadFactory.spawnSprite(body.position.clone(), "Explosion");
      game.soundFactory.playSound("ShipExplodes");
      entity.destroyed = true;
    }
  }

  return { update, kindsOrArchetype: ["Health", "Body"] };
};
