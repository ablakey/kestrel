import { ShipEntity } from "../../Factories/ShipFactory";
import { Game } from "../../game";
import { BaseBehaviour } from "./BaseBehaviour";

export class StopBehaviour extends BaseBehaviour {
  public static readonly initialState = { name: "Stop" } as const;

  public static enter(game: Game, entity: ShipEntity): void {
    entity.components.ai.movementAction = "Stop";
    entity.components.ai.combatAction = "None";
  }
}
