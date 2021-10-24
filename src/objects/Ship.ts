import { GameObjects, Scene } from "phaser";

export class Ship extends GameObjects.Sprite {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "ship:blue");
  }
}
