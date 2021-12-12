import { Game, Entity, System } from "../game";
import { MovementBehaviour, Thrust } from "../enum";
import { assert } from "../utils";
import { Body } from "../Components";

export const AIMovementSystem = (game: Game): System => {
  function update(entity: Entity<"Body" | "Ai" | "Offensive" | "Engine">) {
    const { ai, offensive, body, engine } = entity.components;

    if (offensive.target === null) {
      return;
    }

    const target = game.entities.get(offensive.target);
    assert(target, `Ship: ${entity.id} is targeting ${offensive.target} but is not found.`);
    assert(target?.components.body);

    /**
     * Point at a target.
     */
    if ([MovementBehaviour.PointAt, MovementBehaviour.FlyThrough].includes(ai.movementBehaviour)) {
      const turnDirection = Body.getTurnDirection(body, target.components.body, 0.03);
      engine.direction = turnDirection;
    }

    /**
     * Fly towards a target.
     */
    if (ai.movementBehaviour === MovementBehaviour.FlyThrough) {
      if (Body.getDeltaAngle(body, target.components.body) < 0.03) {
        engine.thrust = Thrust.Forward;
      } else {
        engine.thrust = Thrust.None;
      }
    }
  }

  return { update, componentKinds: ["Body", "Ai", "Offensive", "Engine"] };
};
