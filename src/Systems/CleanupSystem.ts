import { ECS, Entity, System } from "../ecs";

export const CleanupSystem = (ecs: ECS): System => {
  function update(entity: Entity<"Offensive">) {
    const { Offensive } = entity.components;
    /**
     * Clear targets if the target doesn't exist anymore.
     */
    if (Offensive.target !== null && !ecs.entities.has(Offensive.target)) {
      Offensive.target = null;
    }
  }
  return { update, componentKinds: ["Offensive"] };
};
