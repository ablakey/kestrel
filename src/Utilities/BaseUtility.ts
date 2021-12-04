import { Game } from "../game";

export class BaseUtility {
  protected game: Game;

  constructor(game: Game) {
    this.game = game;
  }
}
