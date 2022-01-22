import { Body } from "../Components";
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
      if (Body.isFacing(body, target.components.body)) {
        engine.thrust = "Forward";
      } else {
        engine.thrust = "None";
      }
    }

    /**
     * Turn around and stop.
     */
    if (ai.movementAction === "Stop") {
      if (body.velocity.angle() - body.yaw.angle() > 0.5) {
        console.log("not facing away.");
      } else {
        console.log("Yay!");
      }
    }
  }

  return { update, kindsOrArchetype: ["Body", "Ai", "Navigation", "Engine"] };
};
