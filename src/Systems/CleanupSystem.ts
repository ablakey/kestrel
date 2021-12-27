import { Game, Entity, System } from "../game";

export const CleanupSystem = (game: Game): System => {
  function update(entity: Entity) {
    const { offensive, navigation } = entity.components;

    /**
     * Clear targets if the target doesn't exist anymore.
     */
    if (offensive && offensive.target !== null && game.entities.isDestroyed(offensive.target)) {
      offensive.target = null;
    }

    if (navigation && navigation.target !== null && game.entities.isDestroyed(navigation.target)) {
      navigation.target = null;
    }
  }
  return { update, componentKinds: ["Offensive"] };
};
