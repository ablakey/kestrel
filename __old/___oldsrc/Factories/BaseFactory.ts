import { Game } from "../game";

export class BaseFactory {
  protected game: Game;

  constructor(game: Game) {
    this.game = game;
  }
}
