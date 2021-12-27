import { Game, Entity, System } from "../game";
import { Direction, MovementBehaviour, Thrust } from "../enum";
import { assert } from "../utils";
import { Body } from "../Components";

export const AIMovementSystem = (game: Game): System => {
  function update(entity: Entity<"Body" | "Ai" | "Engine" | "Navigation">) {
    const { ai, body, engine, navigation } = entity.components;

    if (navigation.target === null) {
      if ((ai.movementBehaviour = MovementBehaviour.None)) {
        engine.direction = Direction.None;
      }
      return;
    }

    const target = game.entities.get(navigation.target);
    assert(target, `Ship: ${entity.id} is targeting ${navigation.target} but is not found.`);
    assert(target?.components.body);

    /**
     * Point at a target.
     */
    if ([MovementBehaviour.PointAt, MovementBehaviour.FlyThrough].includes(ai.movementBehaviour)) {
      const turnDirection = Body.getTurnDirection(body, target.components.body);
      engine.direction = turnDirection;
    }

    /**
     * Fly towards a target.
     */
    if (ai.movementBehaviour === MovementBehaviour.FlyThrough) {
      if (Body.getDeltaAngle(body, target.components.body) < 0.01) {
        engine.thrust = Thrust.Forward;
      } else {
        engine.thrust = Thrust.None;
      }
    }
  }

  return { update, componentKinds: ["Body", "Ai", "Offensive", "Engine"] };
};
