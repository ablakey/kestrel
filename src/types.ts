import { Store } from "./utils";

declare global {
  interface Window {
    store: Store;
    game: Phaser.Game;
  }
}
