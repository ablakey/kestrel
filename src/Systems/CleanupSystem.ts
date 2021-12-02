import { Game, Entity, System } from "../game";

export const CleanupSystem = (game: Game): System => {
  function update(entity: Entity<"Offensive">) {
    const { Offensive } = entity.components;
    /**
     * Clear targets if the target doesn't exist anymore.
     */
    if (Offensive.target !== null && game.entities.isDestroyed(Offensive.target)) {
      Offensive.target = null;
    }
  }
  return { update, componentKinds: ["Offensive"] };
};
