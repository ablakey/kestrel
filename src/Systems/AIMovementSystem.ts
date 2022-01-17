import { Body } from "../Components";
import { Thrust } from "../enum";
import { Entity, Game, System } from "../game";
import { assert } from "../utils";

export const AIMovementSystem = (game: Game): System => {
  function update(entity: Entity<"Body" | "Ai" | "Engine" | "Navigation">) {
    const { ai, body, engine, navigation } = entity.components;

    if (ai.movementAction === "None") {
      return;
    }

    const target = game.entities.get(navigation.target);
    assert(target, `Ship: ${entity.id} is targeting ${navigation.target} but is not found.`);
    assert(target.components.body);

    /**
     * Point at a target.
     */
    if (ai.movementAction === "FlyThrough" || ai.movementAction === "PointAt") {
      const turnDirection = Body.getTurnDirection(body, target.components.body);
      engine.direction = turnDirection;
    }

    /**
     * Fly towards a target.
     */
    if (ai.movementAction === "FlyThrough") {
      if (Body.getDeltaAngle(body, target.components.body) < 0.01) {
        engine.thrust = Thrust.Forward;
      } else {
        engine.thrust = Thrust.None;
      }
    }
  }

  return { update, kindsOrArchetype: ["Body", "Ai", "Navigation", "Engine"] };
};
