import { SpaceScene } from "./scenes/SpaceScene";

export function createGame() {
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: "left",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200 },
      },
    },
    scale: {
      mode: Phaser.Scale.RESIZE,
    },
    scene: SpaceScene,
  });

  return game;
}
