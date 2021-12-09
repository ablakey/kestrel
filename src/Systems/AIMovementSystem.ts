import { Game, Entity, System } from "../game";
import { MovementBehaviour, Thrust } from "../enum";
import { assert } from "../utils";

export const AIMovementSystem = (game: Game): System => {
  function update(entity: Entity<"Body" | "AI" | "Offensive" | "Engine">) {
    const { ai, offensive, body, engine } = entity.components;

    if (Offensive.target === null) {
      return;
    }

    const target = game.entities.get(Offensive.target);
    assert(target);
    assert(target?.components.Body);

    /**
     * Point at a target.
     */
    if ([MovementBehaviour.PointAt, MovementBehaviour.FlyThrough].includes(AI.movementBehaviour)) {
      const turnDirection = Body.getTurnDirection(Body, target.components.Body, 0.03);
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
