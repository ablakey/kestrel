import { Politics } from "../../Components";
import { ShipEntity } from "../../Factories/ShipFactory";
import { Game } from "../../game";
import { BaseBehaviour } from "./BaseBehaviour";

export type FindTargetState = {
  name: "FindTarget";
};

export class FindTargetBehaviour extends BaseBehaviour {
  public static readonly initialState = {
    name: "FindTarget",
  } as const;

  public static update(game: Game, entity: ShipEntity) {
    const target = Politics.getMostHostileTarget(entity, game.entities.getShips());

    if (target !== null) {
      console.log(`Ship ${entity.id} now targeting ${target.id}`);
      entity.components.offensive.target = target.id;
      entity.components.navigation.goal = target.id;
    }
  }
}

/**
 * Find the most hostile target present and assign that to this entity's offensive.target
 */
export function findTargetBehaviour(game: Game, entity: ShipEntity) {
  const target = Politics.getMostHostileTarget(entity, game.entities.getShips());

  if (target !== null) {
    console.log(`Ship ${entity.id} now targeting ${target.id}`);
    entity.components.offensive.target = target.id;
    entity.components.navigation.goal = target.id;
  }
}
