import { Entity, Game, System } from "../game";
import { getRandomPosition } from "../utils";

const EXPLOSION_SPREAD = 40;

export const StatsSystem = (game: Game): System => {
  function update(entity: Entity<"Health" | "Body">, delta: number) {
    const { health, body } = entity.components;

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
    if (health.hp <= 0 && health.condition === "Alive") {
      console.info(`Ship ${entity.id} is breaking up.`);
      health.condition = "Destroying";
      health.timeToLive = 3000;
    }

    if (health.timeToLive) {
      health.timeToLive -= delta;
    }

    if (health.condition === "Destroying" && Math.random() < 0.05) {
      // Calculate a random position
      const exposionPosition = getRandomPosition(body.position, EXPLOSION_SPREAD);

      game.doodadFactory.spawnSprite(exposionPosition, "SmallExplosion");
      game.soundFactory.playSound("ShipBreaksUp", { position: body.position });
    }

    if (health.timeToLive !== null && health.timeToLive <= 0) {
      game.doodadFactory.spawnSprite(body.position.clone(), "Explosion");
      game.soundFactory.playSound("ShipExplodes", { position: body.position });
      entity.destroyed = true;
    }
  }

  return { update, kindsOrArchetype: ["Health", "Body"] };
};
