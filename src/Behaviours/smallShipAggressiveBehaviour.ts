import { Body } from "../Components";
import { ShipEntity } from "../Factories/ShipFactory";
import { Game } from "../game";
import { assert } from "../utils";

export type SmallShipAggressiveState = {
  name: "SmallShipAggressive";
  timer: number | null;
  stage: "None" | "Aiming" | "Waiting" | "Pursuing";
};

const WAIT_TIME = 1_000;

export function smallShipAggressiveBehaviour(game: Game, entity: ShipEntity, delta: number) {
  const { ai, body, offensive } = entity.components;
  const behaviour = ai.behaviour as SmallShipAggressiveState;
  const previousStage = behaviour.stage;
  const target = game.entities.get(offensive.target) as ShipEntity;
  assert(target, "Is aggressive to a target but target does not exist.");
  const isFacingTarget = Body.isFacing(body, target.components.body.position);

  /**
   * Decrement timer.
   */
  if (behaviour.timer !== null) {
    behaviour.timer -= delta;
  }

  /**
   * Get what current stage ship should be on.
   */
  let nextStage: SmallShipAggressiveState["stage"];
  if (previousStage === "None") {
    nextStage = "Aiming";
  } else if (previousStage === "Aiming" && isFacingTarget) {
    nextStage = "Waiting";
  } else if (previousStage === "Waiting" && behaviour.timer !== null && behaviour.timer <= 0) {
    console.log("pursuing.");
    nextStage = "Pursuing";
  } else {
    nextStage = behaviour.stage;
  }

  /**
   * If we're in a different stage of AI, update relevant state.
   */
  if (behaviour.stage !== nextStage) {
    console.log(`Ship ${entity.id} AI SmallShipAggressive: ${previousStage} -> ${nextStage}`);
    behaviour.stage = nextStage;
    switch (behaviour.stage) {
      case "Aiming":
        ai.movementAction = "PointAt";
        break;
      case "Waiting":
        behaviour.timer = WAIT_TIME;
        ai.combatAction = "Aggressive";
        break;
      case "Pursuing":
        ai.movementAction = "FlyThrough";
    }
  }
}
