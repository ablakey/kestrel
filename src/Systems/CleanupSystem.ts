import { Game, Entity, System } from "../game";

export const CleanupSystem = (game: Game): System => {
  function update(entity: Entity) {
    const { offensive, navigation, bullet } = entity.components;

    /**
     * Clear targets if the target doesn't exist anymore.
     */
    if (offensive && offensive.target && game.entities.isDestroyed(offensive.target)) {
      offensive.target = null;
    }

    /**
     * Clear nav goal if goal is an entity that doesn't exist anymore.
     */
    if (
      navigation &&
      Number.isInteger(navigation.goal) &&
      game.entities.isDestroyed(navigation.goal as number)
    ) {
      console.log(`set nav target for ${entity.id} to null.`);
      navigation.goal = null;
    }

    if (bullet && bullet.target && game.entities.isDestroyed(bullet.target)) {
      bullet.target = null;
    }
  }
  return { update, kindsOrArchetype: ["Offensive"] };
};
