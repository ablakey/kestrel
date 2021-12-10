import { Game, Entity, System } from "../game";

export const CleanupSystem = (game: Game): System => {
  function update(entity: Entity<"Offensive">) {
    const { offensive } = entity.components;
    /**
     * Clear targets if the target doesn't exist anymore.
     */
    if (offensive.target !== null && game.entities.isDestroyed(offensive.target)) {
      offensive.target = null;
    }
  }
  return { update, componentKinds: ["Offensive"] };
};
