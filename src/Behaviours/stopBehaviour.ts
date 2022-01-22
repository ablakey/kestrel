import { ShipEntity } from "../Factories/ShipFactory";
import { Game } from "../game";

export type StopState = {
  name: "Stop";
};

/**
 * Turn around and stop.
 */
export function stopBehaviour(game: Game, entity: ShipEntity) {
  entity.components.ai.movementAction = "Stop";
}
