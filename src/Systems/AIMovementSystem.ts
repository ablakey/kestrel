import { ECS, Entity, System } from "../ecs";
import { MovementBehaviour, Thrust } from "../enum";
import { assert, getDeltaAngle, getTurnDirection } from "../utils";

export const AIMovementSystem = (ecs: ECS): System => {
  function update(entity: Entity<"Body" | "AI" | "Offensive" | "Engine">) {
    const { AI, Offensive, Body, Engine } = entity.components;

    if (Offensive.target === null) {
      return;
    }

    const target = ecs.entities.get(Offensive.target);
    assert(target);
    assert(target?.components.Body);

    /**
     * Point at a target.
     */
    if ([MovementBehaviour.PointAt, MovementBehaviour.FlyThrough].includes(AI.movementBehaviour)) {
      const turnDirection = getTurnDirection(Body, target.components.Body, 0.03);
      Engine.direction = turnDirection;
    }

    /**
     * Fly towards a target.
     */
    if (AI.movementBehaviour === MovementBehaviour.FlyThrough) {
      if (getDeltaAngle(Body, target.components.Body) < 0.03) {
        Engine.thrust = Thrust.Forward;
      } else {
        Engine.thrust = Thrust.None;
      }
    }
  }

  return { update, componentKinds: ["Body", "AI", "Offensive", "Engine"] };
};
