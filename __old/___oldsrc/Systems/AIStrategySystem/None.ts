import { ShipEntity } from "../../Factories/ShipFactory";
import { Game } from "../../game";
import { BaseBehaviour } from "./BaseBehaviour";

export class NoneBehaviour extends BaseBehaviour {
  public static initialState = { name: "None" } as const;

  public static enter(game: Game, entity: ShipEntity) {
    entity.components.ai.movementAction = "None";
    entity.components.ai.combatAction = "None";
  }
}
