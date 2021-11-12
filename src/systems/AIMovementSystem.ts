import { ECS, Entity, System } from "../ecs";
import { MovementBehaviour } from "../enum";
import { assert, getTurnDirection } from "../utils";

export const AIMovementSystem = (ecs: ECS): System => {
  function update(entity: Entity<"Body" | "AI" | "Offensive" | "Engine">) {
    const { AI, Offensive, Body, Engine } = entity.components;
    if (AI.movementBehaviour === MovementBehaviour.PointAt && Offensive.target !== null) {
      const target = ecs.entities.get(Offensive.target);
      assert(target?.components.Body);
      const turnDirection = getTurnDirection(Body, target?.components.Body, 0.1);
      Engine.direction = turnDirection;
    }
  }

  return { update, componentKinds: ["Body", "AI", "Offensive", "Engine"] };
};
