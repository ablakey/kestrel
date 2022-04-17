import Victor from "victor";
import { Body } from "../Components";
import { Entity, Game, System } from "../game";
import { assert } from "../utils";

export const AIMovementSystem = (game: Game): System => {
  function update(entity: Entity<"Body" | "Ai" | "Engine" | "Navigation">) {
    const { ai, body, engine, navigation } = entity.components;

    if (ai.movementAction === "None") {
      if (!Entity.isPlayer(entity)) {
        engine.direction = "None";
        engine.thrust = "None";
      }
      return;
    }

    /**
     * Turn around and stop.
     * If the direction is None, then we are pointing in the desired direction.
     */
    if (ai.movementAction === "Stop" && body.velocity.magnitude() > 0) {
      engine.direction = Body.getTurnDirectionForOpposite(body);
      engine.thrust = engine.direction === "None" ? "Forward" : "None";
    }

    /**
     * All movements after this require a goal.
     */
    if (navigation.goal === null) {
      return;
    }

    /**
     * Get the nav goal.
     */
    const goal =
      navigation.goal instanceof Victor
        ? navigation.goal
        : game.entities.get(navigation.goal)?.components.body?.position;

    assert(goal);

    /**
     * Point at a target.
     */
    if (ai.movementAction === "FlyThrough" || ai.movementAction === "PointAt") {
      const turnDirection = Body.getTurnDirection(body, goal);
      engine.direction = turnDirection;
    }

    /**
     * Fly towards a target.
     */
    if (ai.movementAction === "FlyThrough") {
      if (Body.isFacing(body, goal)) {
        engine.thrust = "Forward";
      } else {
        engine.thrust = "None";
      }
    }
  }

  return { update, kindsOrArchetype: ["Body", "Ai", "Navigation", "Engine"] };
};
