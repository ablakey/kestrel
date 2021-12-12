import { Game, Entity, System } from "../game";

export const CleanupSystem = (game: Game): System => {
  function update(entity: Entity<"Offensive">) {
    const { offensive } = entity.components;
    /**
     * Clear targets if the target doesn't exist anymore.
     */
    if (offensive.target !== null && game.entities.isDestroyed(offensive.target)) {
      console.log(`Cleanup: Ship ${entity.id} stop targeting ${offensive.target}`);
      offensive.target = null;
    }
  }
  return { update, componentKinds: ["Offensive"] };
};
