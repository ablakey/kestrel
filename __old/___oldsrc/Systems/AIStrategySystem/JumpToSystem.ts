import { ShipEntity } from "../../Factories/ShipFactory";
import { Game } from "../../game";
import { BaseBehaviour } from "./BaseBehaviour";
/**
 * Stop.
 * Point in a direction.
 * Go super fast for x seconds.
 * Trigger loading a new region.
 */
export class JumpToSystemBehaviour extends BaseBehaviour {
  public static readonly initialState = { name: "JumpToSystem" } as const;

  public static update(game: Game, entity: ShipEntity) {}
}
