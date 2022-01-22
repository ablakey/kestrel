import { Politics } from "../Components";
import { ShipEntity } from "../Factories/ShipFactory";
import { Game } from "../game";

/**
 * Find the most hostile target present and assign that to this entity's offensive.target
 */
export function findTargetBehaviour(game: Game, entity: ShipEntity) {
  const target = Politics.getMostHostileTarget(entity, game.entities.getShips());

  if (target !== null) {
    console.log(`Ship ${entity.id} now targeting ${target.id}`);
    entity.components.offensive.target = target.id;
    entity.components.navigation.target = target.id;
  }
}
