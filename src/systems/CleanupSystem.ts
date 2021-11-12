import { ECS, Entity, System } from "../ecs";

export const CleanupSystem = (ecs: ECS): System => {
  function update(entity: Entity<"Offensive">) {
    /**
     * Clear targets if the target doesn't exist anymore.
     */
    if (
      entity.components.offensive.target !== null &&
      !ecs.entities.has(entity.components.offensive.target)
    ) {
      entity.components.offensive.target = null;
    }
  }
  return { update, componentKinds: ["Offensive"] };
};
