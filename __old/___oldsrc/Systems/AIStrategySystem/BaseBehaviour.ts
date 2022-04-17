import { ShipEntity } from "../../Factories/ShipFactory";
import { Game } from "../../game";

export class BaseBehaviour {
  public static readonly initialState = {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static enter(game: Game, entity: ShipEntity): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static exit(game: Game, entity: ShipEntity): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static update(game: Game, entity: ShipEntity, delta: number): void {}
}
