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

    if (navigation && navigation.target && game.entities.isDestroyed(navigation.target)) {
      navigation.target = null;
    }

    if (bullet && bullet.target && game.entities.isDestroyed(bullet.target)) {
      bullet.target = undefined;
    }
  }
  return { update, componentKinds: ["Offensive"] };
};
