import { ShipEntity } from "../Factories/ShipFactory";
import { Game } from "../game";

/**
 * Find the most hostile target present and assign that to this entity's offensive.target
 */
export function noneBehaviour(game: Game, entity: ShipEntity) {
  entity.components.ai.movementAction = "None";
  entity.components.ai.combatAction = "None";
}
